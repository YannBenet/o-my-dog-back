import CoreDatamapper from "./core.datamapper.js";

export default class AnnouncementDatamapper extends CoreDatamapper {
    static tableName = 'announcement'

    static async highlight() {

        try {
            const result  = await this.client.query(
                `SELECT 
                    "user"."id", 
                    "user"."firstname", 
                    "user"."lastname", 
                    "user"."email", 
                    "user"."city", 
                    "user"."phone_number",
                    "announcement"."id" AS "announcement_id", 
                    "announcement"."date_start", 
                    "announcement"."date_end", 
                    "announcement"."mobility", 
                    "announcement"."home", 
                    "announcement"."description"
                FROM 
                    "announcement"
                JOIN 
                    "user" ON "announcement"."user_id" = "user"."id"
                ORDER BY RANDOM()
                LIMIT 5;`
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

    static async getOneAnnouncement(id) {
        try {
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
                    "user"."phone_number",
                    "user"."email",
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
                    "announcement"."id" = $1;
                    `,
                [id]
            );
            
            const { rows } = result;
            return rows[0];
        } catch (error) {
            console.error(`Erreur lors de la récupération de toutes les données`);
            throw error;
        }
    }

    static async updateAnnouncement(id, date_start, date_end, mobility, home, description) {
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
    
    static async deleteAnnouncementAndRelatedTypes(id) {
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

}