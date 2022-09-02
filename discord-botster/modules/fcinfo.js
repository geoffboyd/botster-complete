infoCollect = require('./getinfo.js');
module.exports = {
  name: 'fcinfo',
  description: 'Info on the most recent Fortune Cookie fortune called',
  execute(msg, args) {
    infoCollect.getinfo(msg, args, 'fortune');
  },
};
