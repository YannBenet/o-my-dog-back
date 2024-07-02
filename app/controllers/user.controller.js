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

    const user = await UserDatamapper.findByEmail(email);

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

    const token = await jwtService.createToken({
      id: user[0].id,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      fingerprint
    });

    res.status(200).json({ token });
  },

  async show(req, res) {
    const { id } = req.params;
    console.log(req.token);

    if(parseInt(id) !== req.token){
      return res.status(403).json({ error: 'Acces forbidden' })
    }

    const user = await UserDatamapper.findByPk(id);

    if(!user){
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user)
  }
};