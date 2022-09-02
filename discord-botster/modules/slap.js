module.exports = { 
  name: 'slap', 
  description: 'Slap Someone', 
  execute(msg, args) {
    const slaps = [`you slap ${args[0]} around a bit with a large trout`, `you slap ${args[0]} with a large smelly trout`, `you break out the slapping rod and look sternly at ${args[0]}`, `you slap ${args[0]}'s bottom and grin cheekily`, `you slap ${args[0]} a few times`, `you slap ${args[0]} and start getting carried away`, `you would slap ${args[0]}, but you are not being violent today`, `you give ${args[0]} a hearty slap`, `you find the closest large object and give ${args[0]} a slap with it`, `you like slapping people and randomly pick ${args[0]} to slap`, `you dust off a kitchen towel and slap it at ${args[0]}`];
    if (!args[0]) {
      msg.reply('You need to tell me who you are slapping');
    } else if (args[1]){
      msg.reply("Slow down, pal. Let's slap one person at a time, alright?")
    } else {
      msg.reply(slaps[Math.floor(Math.random()*11)]);
    }
  },
};
