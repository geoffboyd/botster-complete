const { prefix } = require('../../conf/ircConfig.json');
module.exports = {
  name: 'roll',
  description: 'Dice roller',
  execute(msg, args) {
    let numberOfDice = 1;
    let numberOfSides = 6;
    let total = 0;
    args.shift();
    if (!args[0]) { return msg.channel.send(`You rolled a ${Math.ceil(Math.random()*numberOfSides)}`); }
    if (args[0].includes('d')) {
        args[0] = args[0].split('d');
        numberOfDice = (Number(args[0][0]) == args[0][0] && Math.abs(Number(args[0][0])) < 1000) ? Math.abs(Number(args[0][0])) : 1;
        numberOfSides = (Number(args[0][1]) == args[0][1] && Math.abs(Number(args[0][1])) < 100000) ? Math.abs(Number(args[0][1])) : 6;
        args = [numberOfSides, numberOfDice];
    } else {
      numberOfSides = Number(args[0]) == args[0] && Math.abs(Number(args[0])) < 100000 ? Math.abs(Number(args[0])) : 6;
    }


    if (isNaN(args[0]) || Math.floor(args[0]) < 3) { return msg.channel.send(`Usage: \`${prefix}roll\` or \`${prefix}roll 20\` or \`${prefix}roll 3d12\``); }
    for (let i = 0; i<numberOfDice; i++) {
      total += Math.ceil(Math.random()*numberOfSides);
    }
    return msg.channel.send(`You rolled a ${total}`);
  },
};
