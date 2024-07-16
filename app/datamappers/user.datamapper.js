import CoreDatamapper from "./core.datamapper.js";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = 'user';

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