import CoreDatamapper from "./core.datamapper.js";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = 'user';

  static async create(user){
    const { firstname, lastname, email, hashPassword, city, phone_number } = user;
    await this.client.query(
      `INSERT INTO "user" (firstname, lastname, password, email, city, phone_number)
      VALUES ($1, $2, $3, $4, $5, $6)`

      , [
        firstname,
        lastname,
        hashPassword,
        email,
        city,
        phone_number
        ]
    );
  }

  static async findByPk(id){
    const result = await this.client.query(`
      SELECT firstname, lastname, email, city, phone_number
      FROM "user" 
      WHERE id = $1;`,
      [id]
    );
        
    return result.rows[0]; 
  }

  static async delete(id){
    await this.client.query(`
      DELETE
      FROM "user"
      WHERE id = $1;`,
      [id]
    );
  }
};