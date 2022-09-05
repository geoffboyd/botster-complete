const adder = require('./addinfo.js');
module.exports = {
  name: '8balladd',
  description: 'Add new visions to the Magic 8 Ball',
  execute(bot, channel, from, text, commandNames) {
    let args = text.split(' ');
    args.shift();
    text = args.join(' ');
    adder.contentinfo(bot, channel, from, text, 'eightball', 'Magic 8 Ball prediction')
  },
};
