import CoreDatamapper from "./core.datamapper.js";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = 'user';

  static async findByEmail(email){
    const result = await this.client.query(
      `SELECT *
      FROM "user"
      WHERE "email" = $1`,
      [email]
    );

    return result.rows;
  }

  static async create(firstname, lastname, email, hashPassword, city, phoneNumber){
    await this.client.query(
      `INSERT INTO "user" (firstname, lastname, password, email, city, phone_number)
      VALUES ($1, $2, $3, $4, $5, $6)`
      , [
        firstname,
        lastname,
        hashPassword,
        email,
        city,
        phoneNumber
        ]
    );
  }
};