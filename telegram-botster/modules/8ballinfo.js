infoCollect = require('./getinfo.js');
module.exports = {
  name: '8ballinfo',
  description: 'Info on the most recent Magic 8 Ball prediction called',
  execute(bot, channel) {
    infoCollect.getinfo(bot, channel, 'eightball');
  },
};
