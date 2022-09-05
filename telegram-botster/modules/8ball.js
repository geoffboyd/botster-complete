const contentGrabber = require('./getcontent.js');
module.exports = {
  name: '8ball',
  description: 'Magic 8 Ball',
  execute(msg, args) {
    contentGrabber.getcontent(msg, args, 'eightball');
  },
};
