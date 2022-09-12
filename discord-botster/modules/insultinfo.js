infoCollect = require('./getinfo.js');
module.exports = {
  name: 'insultinfo',
  description: 'hows details about the most recent insult',
  adminOnly: false,
  visible: true,
  execute(msg, args) {
    infoCollect.getinfo(msg, args, 'insult');
  },
};
