const fs = require('fs');

module.exports = async (url, key) => {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile('.results', `${url}\n${key}`, () => {
        return resolve();
      });
    } catch (err) {
      return reject(err);
    }
  });
};
