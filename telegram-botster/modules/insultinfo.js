infoCollect = require('./getinfo.js');
module.exports = {
  name: 'insultinfo',
  description: 'Info on the most recent insult called',
  execute(bot, channel) {
    infoCollect.getinfo(bot, channel, 'insult');
  },
};
