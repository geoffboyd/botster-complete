const contentGrabber = require('./getcontent.js');
module.exports = {
  name: 'fortune',
  description: 'Fortune Cookie',
  execute(msg, args) {
    contentGrabber.getcontent(msg, args, 'fortune');
  },
};
