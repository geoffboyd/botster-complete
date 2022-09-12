infoCollect = require('./getinfo.js');
module.exports = {
  name: 'fcinfo',
  description: 'Shows details about the most recent Fortune cookie fortune',
  adminOnly: false,
  visible: true,
  execute(msg, args) {
    infoCollect.getinfo(msg, args, 'fortune');
  },
};
