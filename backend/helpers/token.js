const crypto = require("node:crypto")

const generateToken= () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {generateToken};