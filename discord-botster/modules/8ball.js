const contentGrabber = require('./getcontent.js');
module.exports = {
  name: '8ball',
  description: 'Ask the mystical Magic 8 Ball for guidance',
  adminOnly: false,
  visible: true,
  execute(msg, args) {
    contentGrabber.getcontent(msg, args, 'eightball');
  },
};
