const adder = require('./addinfo.js');
module.exports = {
  name: 'fcadd',
  description: 'Add new fortunes',
  execute(msg, args) {
    adder.contentinfo(msg, args, 'fortune', 'Fortune Cookie fortune')
  },
};
