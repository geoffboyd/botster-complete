const { prefix } = require('../../conf/ircConfig.json');
module.exports = {
  name: 'dice',
  description: 'Roll a virtual die',
  execute(bot, channel, args, from, to) {
    let numberOfDice = 1;
    let numberOfSides = 6;
    let total = 0;
    let dice = [];
    let modifier = 0;
    let advantage = false;
    let disadvantage = false;
    args.shift();
    if (!args[0]) { return bot.say(channel,`You rolled a ${Math.ceil(Math.random()*numberOfSides)}`); }
    let argString = args.join(' ').toLowerCase();
    args = argString.split(' ');
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
        numberOfDice = (args[0][0] && Number(args[0][0]) == args[0][0] && Math.abs(Number(args[0][0])) < 101) ? Math.abs(Number(args[0][0])) : 1;
        numberOfSides = (args[0][1] && Number(args[0][1]) == args[0][1] && Math.abs(Number(args[0][1])) < 100001) ? Math.abs(Number(args[0][1])) : 6;
        if (args[0][0] > 1000) { bot.say(channel, 'Too many dice, max is 100. Defaulting to 1 die for now.'); }
        if (args[0][1] > 100000) { bot.say(channel, 'Too many sides, max is 100000. Defaulting to 6 sides for now.'); }
        args = [numberOfSides, numberOfDice];
    } else {
      numberOfSides = Number(args[0]) == args[0] && Math.abs(Number(args[0])) < 100000 ? Math.abs(Number(args[0])) : 6;
    }

    if (isNaN(args[0]) || Math.floor(args[0]) < 3) { return bot.say(channel,`Usage: \`${prefix}roll\` or \`${prefix}roll 20\` or \`${prefix}roll 3d12\`. Max sides: 100000. Max number of dice: 1000.`); }
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
    if (argString.includes('+')) {
      let args = argString.split('+');
      let modifierElement = args[1];
      if (modifierElement.includes(' ')) {
        modifierElement = modifierElement.split(' ');
        modifierElement = modifierElement.shift();
      }
      if (isNaN(modifierElement)) { modifierElement = 0 }
      else { modifierElement = Number(modifierElement); }
      total += modifierElement;
    }
    return bot.say(channel,`Your total is: ${total}\nYour dice were: ${dice.join(', ')}`);
  },
};
