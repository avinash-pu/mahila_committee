
// jws.js (middleware folder)
const crypto = require('crypto');

const generateToken = (userId) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET;

  const token = `${JSON.stringify(header)}.${JSON.stringify(payload)}`;
  const signature = crypto.createHmac('sha256', secret).update(token).digest('base64url');

  return `${token}.${signature}`;
};

module.exports = generateToken;
