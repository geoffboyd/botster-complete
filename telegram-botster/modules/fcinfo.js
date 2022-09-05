infoCollect = require('./getinfo.js');
module.exports = {
  name: 'fcinfo',
  description: 'Info on the most recent Fortune Cookie fortune called',
  execute(bot, channel) {
    infoCollect.getinfo(bot, channel, 'fortune');
  },
};
