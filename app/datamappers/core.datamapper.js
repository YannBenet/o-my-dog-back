export default class CoreDatamapper {
    // TODO => Supprimer les tryCatch pour remplacer par un mw de gestion d'erreur (à implémenter dans le routeur)

    static tableName = null;

    static init(config) {
        this.client = config.client; 
    }

    // ! Possiblement inutile voir s'il faut supprimer
    // static async findAll() {
    //     try {
    //         const result  = await this.client.query(`SELECT * FROM "${this.tableName}";`)
    //         const { rows } = result; 
    //         return rows
    //     } catch (error) {
    //         console.error(`Erreur lors de la récupération de toutes les données dans la table ${this.tableName}`);
    //         throw error;
    //     }
    // }

    // static async findByPk(id) {
    //     try {
    //         const result = await this.client.query(`SELECT * FROM "${this.tableName}" WHERE id = $1;`, [id]);
    //         const { rows } = result; 
    //         return rows[0]; 
    //     } catch (error) {
    //         console.error(`Erreur lors de la récupération de toutes la donnée avec l'id : ${id} dans la table ${this.tableName}`);
    //         throw error;
    //     }
    // }
}