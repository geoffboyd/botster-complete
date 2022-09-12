const contentGrabber = require('./getcontent.js');
module.exports = {
  name: 'fortune',
  description: 'Open a fortune cookie',
  adminOnly: false,
  visible: true,
  execute(msg, args) {
    contentGrabber.getcontent(msg, args, 'fortune');
  },
};
