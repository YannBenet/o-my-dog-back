import bcrypt from 'bcrypt';
import jwtService from '../libraries/helpers/jwt.services.js';
import { UserDatamapper } from "../datamappers/index.datamapper.js";
import ApiError from '../libraries/errors/api.error.js';
import { v2 as cloudinary } from 'cloudinary';

export default {
  async store(req, res, next){
    // Get user's informations from request
    const { firstname, lastname, email, password, city, phone_number, department_label } = req.body;

    // Check data and add user in database
    const emailAlreadyExists = await UserDatamapper.findOne('email', email);
    if(emailAlreadyExists.length){
      return next(new ApiError('Email already exists', { status: 409 }));
    }

    if(phone_number){
      const phoneAlreadyExists = await UserDatamapper.findOne('phone_number', phone_number)
      if(phoneAlreadyExists.length){
        return next(new ApiError('Phone number already exists', { status: 409 }));
      }
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = {
      firstname,
      lastname,
      email,
      hashPassword,
      city,
      phone_number,
      department_label
    };

    await UserDatamapper.create(user);

    // Response
    res.status(201).json({message : 'User created successfully'});
  },

  async login(req, res, next){
    // Get login informations from request
    const { email, password } = req.body;

    // Check login informations

    const user = await UserDatamapper.findOne('email', email);

    if(!user.length){
      return next(new ApiError('Incorrect email or password', { status: 401 }))
    }

    const passwordValidation = await bcrypt.compare(
      password,
      user[0].password
    );

    if(!passwordValidation){
      return next(new ApiError('Incorrect email or password', { status: 401 }))
    }

    // Create JWT and load it with user's data
    const fingerprint = {
      ip: req.ip,
      userAgent: req.headers['user-agent']
    };

    const token = await jwtService.createToken({
      id: user[0].id,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      fingerprint
    });

    // Response
    res.status(200).json({ token });
  },

  async show(req, res, next){
    // Check that requested data are this user's data
    const { id } = req.params;

    if(parseInt(id) !== req.token){
      return next(new ApiError('Access forbidden', { status: 403 }))
    }

    // Get user's informations from database
    const user = await UserDatamapper.findByPk(id);

    if(!user){
      return next(new ApiError('User not found', { status: 404 }))
    }

    // Response
    res.status(200).json(user);
  },
 
  async update(req, res, next) {
    const { id } = req.params;
    const input = req.body;
    const body = Object.assign({}, req.body);

    if(parseInt(id) !== req.token){
      return next(new ApiError('Access forbidden', { status: 403 }))
    }

    const file = req.file

    if (file) {
      async function uploadImage (imagePath) {
    
        const options = {
            folder : "userImages",
            use_filename: true,
            unique_filename: false,
            overwrite: false,
            transformation : [
            { width: 250, height: 250, crop:"auto" },
            { quality: 'auto' },
            { fetch_format: "auto" }
          ]
        };
    
        try {
            const result = await cloudinary.uploader.upload(imagePath, options);
            return result.url;
        } catch (error) {
            console.error(error);
        }
      };
      
      const urlImg = await uploadImage(req.file.path)

      body.urlImg = urlImg
    }
    // Check if data and update it in database
    if (body.email) {
      const emailAlreadyExists = await UserDatamapper.findOne("email", body.email);
      if(emailAlreadyExists.length){
        if (parseInt(id) !== emailAlreadyExists.id) {
          return next(new ApiError('Email already exists', { status: 409 }));
        }
      }
    }

    if(body.phone_number){
      const phoneAlreadyExists = await UserDatamapper.findOne("phone_number", body.phone_number)
      if(phoneAlreadyExists.length){
        if (parseInt(id) !== phoneAlreadyExists.id) {
          return next(new ApiError('Phone number already exists', { status: 409 }));
        }
      }
    }

    if (body.password){
      const hashPassword = await bcrypt.hash(input.password, 10);
      input.password = hashPassword;
    }

    delete req.body.repeatPassword;
    await UserDatamapper.update(id, body);
    
    // Response
    return res.status(200).json({ message: 'User\'s data updated successfully' });
  },

    //? TODO Necessité de vérifier si l'utilisateur existe avant de la supprimer au cas où l'id transmis par le front serait faux ?
  async delete(req, res, next){
    // Check that requested informations are this user's informations
    const { id } = req.params;

    if(parseInt(id) !== req.token){
      return next(new ApiError('Access forbidden', { status: 403 }))
    }

    // Delete user in database
    await UserDatamapper.delete(id);

    // Response
    res.status(200).json({ message: 'User profile removed successfully' });
  }
};