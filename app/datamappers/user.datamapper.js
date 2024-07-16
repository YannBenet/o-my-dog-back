import CoreDatamapper from "./core.datamapper.js";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = 'user';

  static async findOne(column, data){
    if(column === 'email'){
      const result = await this.client.query(
        `SELECT select_user_by_email($1) AS result;`,
        [data]
      );
      return result.rows[0].result;

    } else if(column === 'phone_number'){
      const result = await this.client.query(
        `SELECT select_user_by_phone($1) AS result;`,
        [data]
      );
      return result.rows[0].result;
    }
  }

  static async findAllDepartments(){
    const result = await this.client.query(`
      SELECT DISTINCT "department_label"
      FROM "user";
    `);
    return result.rows;
  }
};