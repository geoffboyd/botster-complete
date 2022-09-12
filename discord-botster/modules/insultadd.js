const adder = require('./addinfo.js');
module.exports = {
  name: 'insultadd',
  description: 'Add new insults',
  adminOnly: false,
  visible: true,
  execute(msg, args) {
    adder.contentinfo(msg, args, 'insult', 'insult')
  },
};
