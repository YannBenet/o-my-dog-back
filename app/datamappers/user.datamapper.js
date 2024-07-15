import CoreDatamapper from "./core.datamapper.js";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = 'user';

  static async create(user){
    const { firstname, lastname, email, hashPassword, city, phone_number, department_label } = user;
    await this.client.query(
      `INSERT INTO "user" (firstname, lastname, password, email, city, phone_number, department_label)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`

      , [
        firstname,
        lastname,
        hashPassword,
        email,
        city,
        phone_number,
        department_label
        ]
    );
  }

  static async findByPk(id){
    const result = await this.client.query(`
      SELECT firstname, lastname, email, city, phone_number, refresh_token, department_label, url_img
      FROM "user" 
      WHERE id = $1;`,
      [id]
    );
        
    return result.rows[0]; 
  }

  static async findOne(column, data){
    const result = await this.client.query(`
      SELECT *
      FROM "user"
      WHERE ${column} = $1
      `, [
        data
      ]);
      return result.rows;
  }

  static async delete(id){
    await this.client.query(`
      DELETE
      FROM "user"
      WHERE id = $1;`,
      [id]
    );
  }

  static async findAllDepartments(){
    const result = await this.client.query(`
      SELECT DISTINCT "department_label"
      FROM "user";
    `);
    return result.rows;
  }
};