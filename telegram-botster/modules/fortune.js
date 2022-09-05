const contentGrabber = require('./getcontent.js');
module.exports = {
  name: 'fortune',
  description: 'Fortune Cookie',
  execute(bot, channel, from, text) {
    contentGrabber.getcontent(bot, channel, from, text, 'fortune');
  },
};
