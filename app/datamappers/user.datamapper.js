import CoreDatamapper from "./core.datamapper.js";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = 'user';

  static async findByPk(id){
    const result = await this.client.query(`
      SELECT firstname, lastname, email, city, phone_number, refresh_token, department_label
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

  static async findAllDepartments(){
    const result = await this.client.query(`
      SELECT DISTINCT "department_label"
      FROM "user";
    `);
    return result.rows;
  }
};