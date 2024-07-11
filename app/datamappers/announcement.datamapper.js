import CoreDatamapper from "./core.datamapper.js";

export default class AnnouncementDatamapper extends CoreDatamapper {
  static tableName = 'announcement'


    static async highlight() {
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
                ARRAY_AGG("animal_type"."label") AS animal_label
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
        );

      const { rows } = result; 
      return rows
    }

  static async searchAnnouncement(filters) {
    const { department_label, date_start, date_end, animal_label } = filters;

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
        ARRAY_AGG("animal_type"."label") AS animal_label
      FROM 
        "announcement"
      JOIN 
        "user" ON "announcement"."user_id" = "user"."id"
      JOIN 
        "announcement_animal_type" ON "announcement"."id" = "announcement_animal_type"."announcement_id"
      JOIN 
        "animal_type" ON "announcement_animal_type"."animal_type_id" = "animal_type"."id"
      WHERE 
        "user"."department_label" = $1
        AND $2 >= "announcement"."date_start"
        AND $3 <= "announcement"."date_end"
        AND "animal_type"."label" = $4
      GROUP BY
        "announcement"."id",
        "user"."firstname",
        "user"."lastname",
        "user"."city";`,
      [department_label, date_start, date_end, animal_label]
    );
        
    const { rows } = result;
    return rows;
  }

  static async findByPk(id) {
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
        ARRAY_AGG("animal_type"."label") AS animal_label
      FROM
        "announcement"
      JOIN
        "user" ON "announcement"."user_id" = "user"."id"
      LEFT JOIN
        "announcement_animal_type" ON "announcement"."id" = "announcement_animal_type"."announcement_id"
      LEFT JOIN
        "animal_type" ON "announcement_animal_type"."animal_type_id" = "animal_type"."id"
      WHERE
        "announcement"."id" = $1
      GROUP BY
        "announcement"."id",
        "user"."firstname",
        "user"."lastname",
        "user"."city",
        "user"."phone_number",
        "user"."email";
        `,
      [id]
    );
        
    const { rows } = result;
    return rows[0];
  }
    
  static async delete(id) {
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
  }

  static async create(data, id){
    const result = await this.client.query(
      `INSERT INTO "${this.tableName}" (date_start, date_end, mobility, home, description, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`
      , [
        data.date_start,
        data.date_end, 
        data.mobility,
        data.home,
        data.description,
        id
      ] 
    );

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
    );
  }

    static async findByAuthor(authorId) {
        const result = await this.client.query(
            `SELECT 
                "announcement"."id",
                "announcement"."date_start",
                "announcement"."date_end",
                "announcement"."mobility",
                "announcement"."home",
                "announcement"."description",
                ARRAY_AGG("animal_type"."label") AS animal_label
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
    }
}