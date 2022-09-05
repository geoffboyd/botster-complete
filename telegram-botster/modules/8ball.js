const contentGrabber = require('./getcontent.js');
module.exports = {
  name: '8ball',
  description: 'Magic 8 Ball',
  execute(bot, channel, from, text) {
    contentGrabber.getcontent(bot, channel, from, text, 'eightball', 'Magic 8 Ball prediction');
  },
};
