module.exports = {
  name: 'rr',
  description: 'Rick Roll',
  execute(bot, channel, from, text, commandNames) {
    let args = text.split(' ');
    args.shift();
    msg.delete();
    if (args[0]) {
      msg.channel.send('Hey ' + args[0] + ', https://rb.gy/3ekq1k');
    } else {
      msg.channel.send('https://rb.gy/3ekq1k');
    }
  },
};
