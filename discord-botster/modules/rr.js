module.exports = { 
  name: 'rr', 
  description: 'Rick Roll', 
  execute(msg, args) {
    msg.delete();
    if (args[0]) { 
      msg.channel.send('Hey ' + args[0] + ', https://rb.gy/3ekq1k');
    } else {
      msg.channel.send('https://rb.gy/3ekq1k');
    }
  },
};
