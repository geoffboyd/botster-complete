module.exports = {
    name: 'coin',
    description: 'Coin Toss',
    execute(bot, channel, from, text, commandNames) {
      flip = Math.ceil(Math.random()*Math.abs(Math.floor(2)))
      if (flip == 1) {
        bot.telegram.sendMessage(channel, "https://i.ibb.co/19RqxkT/tails.png");
      } else {
        bot.telegram.sendMessage(channel, "https://i.ibb.co/zJFPKZK/heads.png");
      }
    }
  };
