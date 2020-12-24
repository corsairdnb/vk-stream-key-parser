const fs = require('fs');
const start = require('./crawler');

fs.readFile('.credentials', { encoding: 'utf8' }, async (err, data) => {
  if (err) {
    return console.log(err);
  }
  const credentials = data.toString().split('\n');
  const email = credentials[0].trim();
  const password = credentials[1].trim();
  await start({ email, password });
});
