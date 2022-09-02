module.exports = {
  name: 'collatz',
  description: 'Test a number against the Collatz Conjecture',
  execute(msg, args) {
    args.shift();
    const fs = require('fs');
    const Discord = require('discord.js');
    /*
       If n is even, divide the number by 2
       If n is odd, multiply by 3 and add 1
       Log the result in either case, and continue the process using the result
       Output the number of steps before reaching the number 1
       Output an array of the results of every step
    */

    let n = NaN;
    let numberArray = [];

    if (!args[0] || args[1] || !Number(args[0])) {
      return msg.channel.send('Tell me what number you want to test.');
    } else if ((Number(args[0]) != Math.floor(Number(args[0])) || (Number(args[0]) < 1)) ) {
      return msg.channel.send("You didn't input a natural number.");
    } else if (Number(args[0] > 9007199254740990)){
      return msg.channel.send("That's too big-brain for me. Try a smaller number.");
    } else {
      n = Number(args[0]);
      numberArray.push(n);
    };

    while (n != 1) {
      // First test if the number is odd or even and decide the rule to apply
      if (testEven(n)) {
        // Even number, divide by 2
        n = n/2;
      } else {
        // Odd number, multiply by 3 and add 1
        n = (3*n)+1;
      }
      numberArray.push(n);
    };

    let resultLength = numberArray.join(" ").length;

    msg.channel.send('Number of steps: ' + numberArray.length);
//    msg.channel.send("Your number's journey: " + numberArray.join(" "));
	if (numberArray.join(" ").length > 2000) {
		fs.writeFile('./collatzSteps.txt', numberArray.join(" "), function (err) {
			if (err) throw err;
		})
		let attachment = new Discord.MessageAttachment('./collatzSteps.txt');
		msg.channel.send("Your number's journey is attached.", attachment);
    fs.unlink('./collatzSteps.txt', function (err) {
      if (err) throw err;
    })
	} else {
		msg.channel.send("Your number's journey: " + numberArray.join(" "));
	}

    function testEven(num) {
      if (num % 2 == 0) {
        return true;
      } else {
        return false;
      }
    }
  }
};
