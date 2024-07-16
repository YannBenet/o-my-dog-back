import CoreDatamapper from "./core.datamapper.js";

export default class AnnouncementDatamapper extends CoreDatamapper {
  static tableName = 'announcement';


  static async highlight() {
    const result  = await this.client.query(
      `SELECT 
                "announcement"."id" AS "announcement_id", 
                "announcement"."date_start", 
                "announcement"."date_end", 
                "announcement"."mobility", !
                "announcement"."home", !
                "announcement"."description", !
                "user"."id" as "user_id", 
                "user"."firstname", 
                "user"."lastname", 
                "user"."city", 
                "user"."url_img",
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
            LIMIT 8;`,
    );
    const { rows } = result;
    return rows;
  }

  static async searchAnnouncement(data) {
    const result = await this.client.query(
      'SELECT select_announcement_by_filters($1) AS result;',
      [data]
    );
    // Return result
    return result.rows[0].result;
  }

  static async findByAuthor(authorId) {
    const result = await this.client.query(
      `SELECT select_announcement_by_author($1) AS result;`,
      [authorId]
    );
    // Return results
    return result.rows[0].result;
  }
}
