module.exports = {
    name: 'coin',
    description: 'Flip a coin',
    adminOnly: false,
    visible: true,
    execute(msg, args) {
      flip = Math.ceil(Math.random()*Math.abs(Math.floor(2)))
      if (flip == 1) {
        msg.channel.send("https://i.ibb.co/19RqxkT/tails.png");
      } else {
        msg.channel.send("https://i.ibb.co/zJFPKZK/heads.png");
      }
    }
  };
