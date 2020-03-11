import jwt from 'jsonwebtoken';

export const authMiddleware = () => {
    return (req, res, next) => {
      const { authorization } = req.headers;
  
      const token = authorization && authorization.split(' ')[0] === 'Bearer' && authorization.split(' ')[1];
  
      if (!token) {
        return res.status(401).send({ success: false, message: 'Unauthorized'});
      }
  
      try {
        jwt.verify(token, 'secret');
      } catch (error) {
        return res.status(403).send({ success: false, message: 'Forbidden'});
      }
  
      next();
    };
  };