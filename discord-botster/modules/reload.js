const { owner } = require("../../conf/discConfig.json");

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	adminOnly: true,
	visible: false,
	execute(msg, args, generalCommands, adminCommands) {
		if (msg.author.id !== owner) { return msg.reply("https://media.giphy.com/media/VdWkLbTcqmw324kYFL/giphy.gif") }
		if (!args[1]) { return msg.channel.send("You didn't provide a command name to reload"); }
		const command = args[1].toLowerCase();

		if (!generalCommands.find(o => o.name === command) && !adminCommands.find(o => o.name === command)) {
			return msg.channel.send(`There is no command named \`${command}\`, ${msg.author.username}!`);
		}

		delete require.cache[require.resolve(`./${command}.js`)];

		try {
			const newCommand = require(`./${command}.js`);
			return msg.channel.send(`Command '${command}' was reloaded!`);
		} catch (error) {
			console.log(error);
			return msg.channel.send(`There was an error while reloading a command '${command}':\n\`${error.message}\``);
		}
	},
};
