import CoreDatamapper from "./core.datamapper.js";
import ApiError from '../libraries/errors/api.error.js';
import { log } from "util";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = 'user';

  static async findOne(column, data){
    if(column === 'email'){
      console.log('dans datamapper');
      const result = await this.client.query(
        `SELECT select_user_by_email($1::text) AS result;`,
        [data]
      );
      return result.rows[0].result;
    } else if(column === 'phone_number'){
      const result = await this.client.query(
        `SELECT select_user_by_phone($1::text) AS result;`,
        [data]
      );
      return result.rows[0].result;
    } else {
      throw new ApiError('Ressource not found', { status: 404 });
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
