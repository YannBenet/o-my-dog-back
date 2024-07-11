import jwt from 'jsonwebtoken';
import jwtServices from '../helpers/jwt.services.js';

export default () => async (req, res, next) => {
  try {
    // Verify access token
    const token = req.headers.authorization.split(' ')[1];
    const tokenInfos = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];
    
    if(ip !== tokenInfos.data.fingerprint.ip || userAgent !== tokenInfos.data.fingerprint.userAgent){
      throw new Error('Invalid token', { status: 401 });
    }
    // Store user id in request and next
    req.token = tokenInfos.data.id;

    next();

  } catch(err) {
    console.log(`Entrée dans l\'erreur de la vérification access token: ${err}`);
    // If access token is expired try to generate new one
    if(err.name === 'TokenExpiredError' || err.message === 'jwt must be provided'){
      // Get refresh token from cookies
      const token = req.cookies.refreshToken;
      if(!token){
        return next(new Error('Invalid refresh token', { status: 401 }));
      }

      try {
        // Verify refresh token
        const refreshTokenInfos = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const ip = req.ip;
        const userAgent = req.headers['user-agent'];

        if(ip !== refreshTokenInfos.data.fingerprint.ip || userAgent !== refreshTokenInfos.data.fingerprint.userAgent){
          return next(new Error('Invalid refresh token', { status: 401 }));
        }
        // Generate new tokens
        const { accessToken, refreshToken } = await jwtServices.refreshTokens(token, refreshTokenInfos.data);
        
        // Store new tokens in response and next
        //! TODO modifier secure: false par secure: true quand l'appli sera en https
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'Strict',
          maxAge:  7 * 86400000
        });
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        req.token = refreshTokenInfos.data.id;

        return next();
      } catch(err) {

        return next(err);
      }
    }

    next(err);
  }
}