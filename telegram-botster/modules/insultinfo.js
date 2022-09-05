infoCollect = require('./getinfo.js');
module.exports = {
  name: 'insultinfo',
  description: 'Info on the most recent insult called',
  execute(msg, args) {
    infoCollect.getinfo(msg, args, 'insult');
  },
};
