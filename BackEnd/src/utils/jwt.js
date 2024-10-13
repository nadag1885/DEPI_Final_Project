import jwt from 'jsonwebtoken';

function createJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
}

function verifyJWT(token) {
  try{
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export { createJWT, verifyJWT };