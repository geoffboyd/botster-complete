const adder = require('./addinfo.js');
module.exports = {
  name: 'fcadd',
  description: 'Add new fortunes to the fortune cookie list',
  adminOnly: false,
  visible: true,
  execute(msg, args) {
    adder.contentinfo(msg, args, 'fortune', 'Fortune Cookie fortune')
  },
};
