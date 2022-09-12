const contentGrabber = require('./getcontent.js');
module.exports = {
  name: 'insult',
  description: 'Insults either you or the person you tag',
  adminOnly: false,
  visible: true,
  execute(msg, args) {
    contentGrabber.getcontent(msg, args, 'insult');
  },
};
