import bcrypt from 'bcrypt';
import { UserDatamapper } from "../datamappers/index.datamapper.js";

export default {
  async store(req, res){
    const { firstname, lastname, email, password, city, phoneNumber } = req.body;

    const emailAlreadyExists = await UserDatamapper.findByEmail(email);

    if(emailAlreadyExists){
      return res.status(409).json({ error: 'Email already exists' })
    };

    console.log(password);
    const hashPassword = await bcrypt.hash(password, 10);

    await UserDatamapper.create(firstname, lastname, email, hashPassword, city, phoneNumber);

    res.status(201).json({message : 'User created successfully'});
  }

};