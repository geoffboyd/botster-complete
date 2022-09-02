module.exports = {
  name: 'deadcat',
  description: 'It\'s a dead cat...',
  execute(msg, args) {
    const secret = require("./secret.json");
    if (msg.author.id == secret.andy || msg.author.id == secret.owner) {
      msg.channel.send("https://www.socialsciencespace.com/wp-content/uploads/1667951349-dead-cat-clipart-1_opt.jpg")
	  .then(msg => {
        setTimeout(() => msg.delete(), 2000);
      })
    }
  },
};
