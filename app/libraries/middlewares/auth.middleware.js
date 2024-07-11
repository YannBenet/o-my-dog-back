import jwt from 'jsonwebtoken';

export default () => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const tokenInfos = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const ip = req.ip;
    const userAgent = req.headers['user-agent']
    
    if(ip !== tokenInfos.data.fingerprint.ip || userAgent !== tokenInfos.data.fingerprint.userAgent){
      throw new Error();
    }
    
    req.token = tokenInfos.data.id;

    next();
} catch {
    res.status(401).json({ error: 'Invalid token'})
  }
}