const contentGrabber = require('./getcontent.js');
module.exports = {
  name: 'insult',
  description: 'Insult someone',
  execute(msg, args) {
    contentGrabber.getcontent(msg, args, 'insult');
  },
};
