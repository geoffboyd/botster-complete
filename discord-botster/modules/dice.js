module.exports = {
  name: 'dice',
  description: 'Dice roller',
  execute(msg, args) {
    args.shift();
    if (!args[0]) { return msg.channel.send(`You rolled a ${Math.ceil(Math.random()*6)}`); }
    if (Math.abs(args[0]) > 100000) { return msg.channel.send('Max number of sides is 100000'); }
    if (isNaN(args[0]) || Math.floor(args[0]) == 1) { return msg.channel.send('Please enter a numerical value of 2 or higher for the number of sides'); }
    return msg.channel.send(`You rolled a ${Math.ceil(Math.random()*Math.abs(Math.floor(args[0])))}`);
  },
};
