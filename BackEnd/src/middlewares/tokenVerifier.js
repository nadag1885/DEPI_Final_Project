import { verifyJWT } from "../utils/jwt.js";
import User from "../models/users.js";

async function tokenVerifierMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Not Authorized: Token not found' });
  }

  if (!token.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not Authorized: Invalid token' });
  }

  const decodedToken = verifyJWT(token.split(' ')[1]);
  if (!decodedToken) {
    return res.status(401).json({ message: 'Not Authorized: Expired or invalid token' });
  }


  req.user = await User.findById(decodedToken.userId);
  if (!req.user) {
    return res.status(404).json({ message: 'User not found' });
  }
  next();
}

export default tokenVerifierMiddleware;