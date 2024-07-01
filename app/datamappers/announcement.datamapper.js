import CoreDatamapper from "./core.Datamapper.js";

export default class AnnouncementDatamapper extends CoreDatamapper {
    static tableName = 'announcement';

    static async create(data) {
        try {
            const result = await this.client.query(`INSERT INTO "${this.tableName}" (name) VALUES ($1) RETURNING *;`, [data.name]);
            const { rows } = result; 
            return rows[0]; 
        } catch (error) {
            console.error(`Erreur lors de la création de la donnée dans la table ${this.tableName}`);
            throw error;
        }
    }
}