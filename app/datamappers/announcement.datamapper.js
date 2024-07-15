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

  static async searchAnnouncement(data) {
    // const { department_label, date_start, date_end, animal_label } = filters;

    const result = await this.client.query(
      'SELECT select_announcement_by_filters($1);',
      // `SELECT 
      //   "announcement"."id",
      //   "announcement"."date_start",
      //   "announcement"."date_end",
      //   "announcement"."mobility",
      //   "announcement"."home",
      //   "announcement"."description",
      //   "user"."firstname",
      //   "user"."lastname",
      //   "user"."city",
      //   ARRAY_AGG("animal_type"."label") AS animal_label
      // FROM 
      //   "announcement"
      // JOIN 
      //   "user" ON "announcement"."user_id" = "user"."id"
      // JOIN 
      //   "announcement_animal_type" ON "announcement"."id" = "announcement_animal_type"."announcement_id"
      // JOIN 
      //   "animal_type" ON "announcement_animal_type"."animal_type_id" = "animal_type"."id"
      // WHERE 
      //   "user"."department_label" = $1
      //   AND $2 >= "announcement"."date_start"
      //   AND $3 <= "announcement"."date_end"
      //   AND "animal_type"."label" = $4
      // GROUP BY
      //   "announcement"."id",
      //   "user"."firstname",
      //   "user"."lastname",
      //   "user"."city";`,
      [data]
    );
        
    const { rows } = result;
    return rows[0].select_announcement_by_filters;
  }

  static async findByPk(id) {
    const result = await this.client.query(
      `SELECT select_announcement_by_pk($1);`,
      [id]
    );
    // Return result
    const { rows } = result;
    return rows[0].select_announcement_by_pk;
  }

  static async findByAuthor(authorId) {
    const result = await this.client.query(
      `SELECT select_announcement_by_author($1);`
      , [authorId]);
    // Return results
    return result.rows[0].select_announcement_by_author;
  }
}