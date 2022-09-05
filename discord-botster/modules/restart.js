const { owner } = require("../conf/config.json");

module.exports = {
  name: 'restart',
  description: 'Restart bot',
  execute(msg, args) {
		if (msg.author.id !== owner) { return msg.reply("https://media.giphy.com/media/VdWkLbTcqmw324kYFL/giphy.gif") }
    process.exit();
  },
};
