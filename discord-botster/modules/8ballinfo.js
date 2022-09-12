infoCollect = require('./getinfo.js');
module.exports = {
  name: '8ballinfo',
  description: 'Shows details about the most recent 8ball fortune',
  adminOnly: false,
  visible: true,
  execute(msg, args) {
    infoCollect.getinfo(msg, args, 'eightball');
  },
};
