const adder = require('./addinfo.js');
module.exports = {
  name: 'insultadd',
  description: 'Add new insults',
  execute(bot, channel, from, text, commandNames) {
    let args = text.split(' ');
    args.shift();
    text = args.join(' ');
    adder.contentinfo(bot, channel, from, text, 'insult', 'insult')
  },
};
