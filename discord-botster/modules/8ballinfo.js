infoCollect = require('./getinfo.js');
module.exports = {
  name: '8ballinfo',
  description: 'Info on the most recent Magic 8 Ball prediction called',
  execute(msg, args) {
    infoCollect.getinfo(msg, args, 'eightball');
  },
};
