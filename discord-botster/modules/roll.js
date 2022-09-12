/*
    Dice roller that accepts the following input formats:
      * .roll
      * .roll 6
      * .roll 3d12
      * .roll 2d20 adv
      * .roll 2d20 dis
      * .roll 3d12 +6
*/

const { prefix } = require('../../conf/ircConfig.json');
module.exports = {
  name: 'roll',
  description: 'Roll a die. Optionally choose number of sides or add a modifier.',
  adminOnly: false,
  visible: true,
  execute(msg, args) {
    let numberOfDice = 1;
    let numberOfSides = 6;
    let total = 0;
    let dice = [];
    let modifier = 0;
    let advantage = false;
    let disadvantage = false;
    args.shift();
    if (!args[0]) { return msg.channel.send(`You rolled a ${Math.ceil(Math.random()*numberOfSides)}`); }
    let text = args.join(' ').toLowerCase();
    args = text.split(' ');
    if (args.includes('adv')) {
      advantage = true;
      args.splice(args.indexOf('adv'), 1);
    }
    if (args.includes('dis')) {
      args.splice(args.indexOf('dis'), 1);
      disadvantage = true;
    }
    if (args[0].includes('d')) {
        args[0] = args[0].split('d');
        numberOfDice = (args[0][0] && Number(args[0][0]) == args[0][0] && Math.abs(Number(args[0][0])) < 1001) ? Math.abs(Number(args[0][0])) : 1;
        numberOfSides = (args[0][1] && Number(args[0][1]) == args[0][1] && Math.abs(Number(args[0][1])) < 100001) ? Math.abs(Number(args[0][1])) : 6;
        if (args[0][0] > 1000) { bot.say(channel, 'Too many dice, max is 100. Defaulting to 1 die for now.'); }
        if (args[0][1] > 100000) { bot.say(channel, 'Too many sides, max is 100000. Defaulting to 6 sides for now.'); }
        args = [numberOfSides, numberOfDice];
    } else {
      numberOfSides = Number(args[0]) == args[0] && Math.abs(Number(args[0])) < 100000 ? Math.abs(Number(args[0])) : 6;
    }

    if (isNaN(args[0]) || Math.floor(args[0]) < 3) { return msg.channel.send(`Usage: \`${prefix}roll\` or \`${prefix}roll 20\` or \`${prefix}roll 3d12\``); }
    for (let i = 0; i<numberOfDice; i++) {
      let dieRoll = Math.ceil(Math.random()*numberOfSides);
      if (advantage) {
        let dieRoll2 = Math.ceil(Math.random()*numberOfSides);
        if (dieRoll2 > dieRoll) { dieRoll = dieRoll2 }
      } else if (disadvantage) {
        let dieRoll2 = Math.ceil(Math.random()*numberOfSides);
        if (dieRoll2 < dieRoll) { dieRoll = dieRoll2 }
      }
      total += dieRoll;
      dice.push(dieRoll);
    }
    if (text.includes('+')) {
      let args = text.split('+');
      let modifierElement = args[1];
      if (modifierElement.includes(' ')) {
        modifierElement = modifierElement.split(' ');
        modifierElement = modifierElement.shift();
      }
      if (isNaN(modifierElement)) { modifierElement = 0 }
      else { modifierElement = Number(modifierElement); }
      total += modifierElement;
    }
    return msg.channel.send(`Your total is: ${total}\nYour dice were: ${dice.join(', ')}`);
  },
};
