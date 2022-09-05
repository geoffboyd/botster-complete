const contentGrabber = require('./getcontent.js');
module.exports = {
  name: 'insult',
  description: 'Insult someone',
  execute(bot, channel, from, text) {
    contentGrabber.getcontent(bot, channel, from, text, 'insult');
  },
};
