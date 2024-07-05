import jwt from 'jsonwebtoken';

export default {

  async createToken(data){
    const tokenExp = Math.round(Date.now() / 1000 + 3600);
    const token = jwt.sign(
      {exp: tokenExp, data},
      process.env.JWT_PRIVATE_KEY
    );

    return token
  }
};