import bcrypt from 'bcrypt';
import { UserDatamapper } from "../datamappers/index.datamapper.js";

export default {
  async store(req, res){
    const { firstname, lastname, email, password, city, phoneNumber } = req.body;

    const emailAlreadyExists = await UserDatamapper.findByEmail(email);

    if(emailAlreadyExists){
      return res.status(409).json({ error: 'Email already exists' })
    };

    const hashPassword = await bcrypt.hash(password, 10);

    await UserDatamapper.create(firstname, lastname, email, hashPassword, city, phoneNumber);

    res.status(201).json({message : 'User created successfully'});
  },

   async update(req, res) {
    const { id } = req.params;
    const input = req.body;

    if(parseInt(id) !== req.token){
      return res.status(403).json({ error: 'Access forbidden' })
    }

    if (input.email) {
      const emailAlreadyExists = await UserDatamapper.findByEmail(input.email);
      if (emailAlreadyExists.length){
        if(parseInt(id) !== emailAlreadyExists[0].id){
          return res.status(409).json({ error: 'Email already exists' })
        };
      }
    }

    if (input.password){
      const hashPassword = await bcrypt.hash(input.password, 10);
      input.password = hashPassword
    }

    delete req.body.repeatPassword;
    const row = await UserDatamapper.update(id, input);
    return res.json({ data: row });
  }
};