const adder = require('./addinfo.js');
module.exports = {
  name: 'fcadd',
  description: 'Add new fortunes',
  execute(bot, channel, from, text, commandNames) {
    let args = text.split(' ');
    args.shift();
    text = args.join(' ');
    adder.contentinfo(bot, channel, from, text, 'fortune', 'Fortune Cookie fortune')
  },
};
