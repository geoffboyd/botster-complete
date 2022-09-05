module.exports = {
    name: 'josephus',
    description: 'Test a number against the Josephus Problem',
    execute(bot, channel, from, text, commandNames) {
    /*
      Josephus Problem
    */
    let args = text.split(' ');
    args.shift();
    let n = NaN;
    let numberArray = [];
    let initialCounter;
    let skips = 1;

    if (!args[0] || args[2]) {
      return bot.telegram.sendMessage(channel, 'Usage: test.js [integer to test] [distance to next victim]');
    } else if (!Number(args[0]) || (args[1] && !Number(args[1]))) {
      return bot.telegram.sendMessage(channel, "You didn't input a number.");
    } else if (Number(args[0]) != Math.floor(Number(args[0])) || (args[1] && Number(args[1]) != Math.floor(Number(args[1])))) {
      return bot.telegram.sendMessage(channel, "You didn't input an integer");
    } else {
      n = Math.abs(Number(args[0])) + 1;
      if (args[1] > 1) { skips = Number(args[1]);}
    };

    for (initialCounter = 1; initialCounter < n; initialCounter++ ) {
      numberArray.push(initialCounter);
    }

    while (numberArray.length > 1) {
      numberArray.push(numberArray.shift());
      if (skips > 1){
        for (skipsCounter = 1; skipsCounter < skips; skipsCounter++){
          numberArray.push(numberArray.shift());
        }
      }
      numberArray.splice(0,1);
    }
    bot.telegram.sendMessage(channel, "Person number " + numberArray + " is the survivor.");
  }
};
