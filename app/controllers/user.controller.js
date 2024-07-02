import bcrypt from 'bcrypt';
import jwtService from '../libraries/helpers/jwt.services.js';
import { UserDatamapper } from "../datamappers/index.datamapper.js";

export default {
  async store(req, res){
    const { firstname, lastname, email, password, city, phoneNumber } = req.body;

    const emailAlreadyExists = await UserDatamapper.findByEmail(email);

    if(emailAlreadyExists.length){
      return res.status(409).json({ error: 'Email already exists' })
    };

    console.log(password);
    const hashPassword = await bcrypt.hash(password, 10);

    await UserDatamapper.create(firstname, lastname, email, hashPassword, city, phoneNumber);

    res.status(201).json({message : 'User created successfully'});
  },

  async login(req, res){
    const { email, password } = req.body;

    console.log(email,password);

    const user = await UserDatamapper.findByEmail(email);

    console.log(`user.req: ${JSON.stringify(user)}`);

    if(!user.length){
      return res.status(401).json({ error: 'Incorrect email or password'});
    }

    const passwordValidation = await bcrypt.compare(
      password,
      user[0].password
    );

    if(!passwordValidation){
      return res.status(401).json({ error: 'Incorrect email or password'});
    }

    const fingerprint = {
      ip: req.ip,
      userAgent: req.headers['user-agent']
    }

    console.log(`fingerprint: ${fingerprint}`);

    const token = await jwtService.createToken({
      id: user[0].id,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      fingerprint
    });
    console.log(`token: ${token}`);

    res.status(200).json({ token });
  }
};