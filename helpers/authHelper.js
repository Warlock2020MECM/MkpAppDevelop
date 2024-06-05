const bcrypt = require("bcrypt");

//HASH FUNCTIONS
exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

// Comprar || Funcion descencriptar 

exports.comparePassword = (password,hashed) => {
    return bcrypt.compare(password, hashed);
}