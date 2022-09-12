const adder = require('./addinfo.js');
module.exports = {
  name: '8balladd',
  description: 'Add new visions to the Magic 8 Ball',
  adminOnly: false,
  visible: true,
  execute(msg, args) {
    adder.contentinfo(msg, args, 'eightball', 'Magic 8 Ball prediction')
  },
};
