import CoreDatamapper from "./core.Datamapper.js";

export default class UserDatamapper extends CoreDatamapper {
    static tableName = 'user';

    static async highlight() {

        try {
            const result  = await this.client.query(
                `SELECT "user"."id", "user"."firstname", "user"."lastname", "user"."email", "user"."city", "user"."phone_number",
                "announcement"."id", "announcement"."date_start", "announcement"."date_end", "announcement"."mobility", "announcement"."home", "announcement"."description"
                FROM "user"
                JOIN "announcement" ON "user"."id" = "announcement"."user_id"
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
}