import bcrypt from 'bcrypt';
import UserDatamapper from "../datamappers/user.datamapper.js";

export default {
  async store(req, res){
    const { firstname, lastname, email, password, city, phoneNumber, repeatPassword } = req.body;

    const emailAlreadyExists = await UserDatamapper.findByEmail(email);

    if(emailAlreadyExists){
      return res.status(409).json({ error: 'Email already exists' })
    };

    const hashPassword = await bcrypt.hash(password, 10)

    await UserDatamapper.create(firstname, lastname, email, hashPassword, city, phoneNumber, repeatPassword);

    res.status(201).json({message : 'User created successfully'});
  }

};