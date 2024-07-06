import CoreDatamapper from "./core.datamapper.js";

export default class AnnouncementDatamapper extends CoreDatamapper {
    static tableName = 'announcement'

    static async highlight() {

        try {
            const result  = await this.client.query(
                `SELECT 
                    "announcement"."id" AS "announcement_id", 
                    "announcement"."date_start", 
                    "announcement"."date_end", 
                    "announcement"."mobility", 
                    "announcement"."home", 
                    "announcement"."description",
                    "user"."id" as "user_id", 
                    "user"."firstname", 
                    "user"."lastname", 

                    "user"."city", 
                    ARRAY_AGG("animal_type"."label") AS animals
                FROM 
                    "announcement"
                JOIN 
                    "user" ON "announcement"."user_id" = "user"."id"
                JOIN 
                    "announcement_animal_type" ON "announcement"."id" = "announcement_animal_type"."announcement_id"
                JOIN 
                    "animal_type" ON "announcement_animal_type"."animal_type_id" = "animal_type"."id"
                GROUP BY 
                    "announcement"."id",
                    "user"."id"
                ORDER BY RANDOM()
                LIMIT 8;`
            )
            const { rows } = result; 
            return rows
        } catch (error) {
            console.error(`Erreur lors de la récupération de toutes les données dans la table ${this.tableName}`);
            throw error;
        }
    }

    static async searchAnnouncement(filters) {
        try {
            const { city, date_start, date_end, animal_label } = filters;
            console.log(city);
    
            const result = await this.client.query(
                `SELECT 
                    "announcement"."id",
                    "announcement"."date_start",
                    "announcement"."date_end",
                    "announcement"."mobility",
                    "announcement"."home",
                    "announcement"."description",
                    "user"."firstname",
                    "user"."lastname",
                    "user"."city",
                    "animal_type"."label"
                FROM 
                    "announcement"
                JOIN 
                    "user" ON "announcement"."user_id" = "user"."id"
                JOIN 
                    "announcement_animal_type" ON "announcement"."id" = "announcement_animal_type"."announcement_id"
                JOIN 
                    "animal_type" ON "announcement_animal_type"."animal_type_id" = "animal_type"."id"
                WHERE 
                    "user"."city" = $1
                    AND "announcement"."date_start" >= $2
                    AND "announcement"."date_end" <= $3
                    AND "animal_type"."label" = $4;`,
                [city, date_start, date_end, animal_label]
            );
            
            const { rows } = result;
            return rows;
        } catch (error) {
            console.error(`Erreur lors de la récupération de toutes les données dans la table ${this.tableName}`);
            throw error;
        }
    }

    static async findOne(id) {
        try {
            const result = await this.client.query(
            `SELECT 
                "announcement"."id" AS "announcement_id", 
                "announcement"."date_start", 
                "announcement"."date_end", 
                "announcement"."mobility", 
                "announcement"."home", 
                "announcement"."description",
                "user"."id" as "user_id", 
                "user"."firstname", 
                "user"."lastname",
                "user"."phone_number",
                "user"."email", 
                "user"."city", 
                ARRAY_AGG("animal_type"."label") AS animals
            FROM 
                "announcement"
            JOIN 
                "user" ON "announcement"."user_id" = "user"."id"
            JOIN 
                "announcement_animal_type" ON "announcement"."id" = "announcement_animal_type"."announcement_id"
            JOIN 
                "animal_type" ON "announcement_animal_type"."animal_type_id" = "animal_type"."id"
            WHERE
                "announcement"."id" = $1
            GROUP BY 
                "announcement"."id",
                "user"."id";`,
                [id]
            );
            
            const { rows } = result;
            return rows[0];
        } catch (error) {
            console.error(`Erreur lors de la récupération de toutes les données`);
            throw error;
        }
    }

    static async update(id, date_start, date_end, mobility, home, description) {
        try {
            await this.client.query(
                `UPDATE 
                    "announcement"
                SET 
                    "date_start" = $1,
                    "date_end" = $2,
                    "mobility" = $3,
                    "home" = $4,
                    "description" = $5
                WHERE 
                    "id" = $6;`,
                [date_start, date_end, mobility, home, description, id]
            );
        } catch (error) {
            console.error(`Erreur lors de la récupération de toutes les données`);
            throw error;
        }
    }
    

    static async delete(id) {
        await this.client.query('BEGIN');
        try {
          // Delete from announcement_animal_type
          await this.client.query(`
            DELETE FROM "announcement_animal_type"
            WHERE "announcement_id" = $1;
          `, [id]);
      
          // Delete from announcement
          await this.client.query(`
            DELETE FROM "announcement"
            WHERE "id" = $1;
          `, [id]);
      
          await this.client.query('COMMIT');
        } catch (error) {
          await this.client.query('ROLLBACK');
          throw error;
        }
      }

    static async create(b, id){
        const result = await this.client.query(
            `INSERT INTO "${this.tableName}" (date_start, date_end, mobility, home, description, user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`
            , [
                b.date_start,
                b.date_end, 
                b.mobility,
                b.home,
                b.description,
                id
            ] 
        )
        return result.rows[0]
    }

    static async addAuthorizedAnimals(id, animalLabel){
        await this.client.query(
            `INSERT INTO "announcement_animal_type" (announcement_id, animal_type_id)
            VALUES ($1, (
                SELECT "animal_type"."id" 
                FROM "animal_type" 
                WHERE "animal_type"."label" = $2
            ))`
            , [
                id,
                animalLabel
            ]
        )
    }



    static async findByAuthor(authorId) {
        try {
            const result = await this.client.query(
                `SELECT 
                    "announcement"."id",
                    "announcement"."date_start",
                    "announcement"."date_end",
                    "announcement"."mobility",
                    "announcement"."home",
                    "announcement"."description",
                    ARRAY_AGG("animal_type"."label") AS animals
                FROM 
                    "${this.tableName}" 
                JOIN 
                    "announcement_animal_type" ON "announcement"."id" = "announcement_animal_type"."announcement_id"
                JOIN 
                    "animal_type" ON "announcement_animal_type"."animal_type_id" = "animal_type"."id"
                WHERE "announcement"."user_id" = $1
                GROUP BY 
                    "announcement"."id";`, [authorId]);
            return result.rows[0]
        } catch (error) {
            console.error(`Erreur lors de la récupération de toutes les entrées du user avec l'id: ${authorId} dans la table ${this.tableName}`);
            throw error;
        }
    }
}