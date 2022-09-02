module.exports = { 
  name: 'dice', 
  description: 'Dice roller', 
  execute(msg, args) {
    if (!args[0]){
      msg.channel.send(Math.ceil(Math.random()*6));
    } else if (Math.abs(args[0]) > 100000) {
    msg.channel.send('Max number of sides is 100000');
    }else if (isNaN(args[0]) || Math.floor(args[0]) == 1) {
      msg.channel.send('Please enter a numerical value of 2 or higher for the number of sides');
    } else {
    msg.channel.send(Math.ceil(Math.random()*Math.abs(Math.floor(args[0]))));
    }
  },
};
