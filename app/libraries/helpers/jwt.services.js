import jwt from 'jsonwebtoken';
import { UserDatamapper } from '../../datamappers/index.datamapper.js';

export default {

  async createTokens(data){
    const accessTokenExp = Math.round(Date.now() / 1000 + 15 * 2);
    const refreshTokenExp = Math.round(Date.now() / 1000 + 604800);

    const accessToken = jwt.sign(
      { exp: accessTokenExp, data },
      process.env.JWT_PRIVATE_KEY
    );
    const refreshToken = jwt.sign(
      { exp: refreshTokenExp, data },
      process.env.JWT_PRIVATE_KEY
    );

    await UserDatamapper.update(data.id, { refresh_token: refreshToken });

    return { accessToken, refreshToken };
  },

  async refreshTokens(refreshToken, data){
    console.log(`Data from refresh token: ${JSON.stringify(data)}`);
    const user = await UserDatamapper.findByPk(data.id);
    console.log(`user from database : ${JSON.stringify(user)}`);
    if(user.refresh_token !== refreshToken){
      console.log('Les refresh tokens sont différents');
      await UserDatamapper.update(data.id, { refresh_token: null });
      throw new Error('Invalid refresh token', { status: 401 });
    }

    const tokens = await this.createTokens(data);
    return tokens;
  }
};