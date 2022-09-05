const { owner } = require("../conf/config.json");

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	execute(msg, args, commandNames) {
		if (msg.author.id !== owner) { return msg.reply("https://media.giphy.com/media/VdWkLbTcqmw324kYFL/giphy.gif") }
		if (!args[1]) { return msg.channel.send("You didn't provide a command name to reload"); }
		const command = args[1].toLowerCase();

		if (!commandNames.includes(command)) {
			return msg.channel.send(`There is no command with name or alias \`${command}\`, ${msg.author.username}!`);
		}

		delete require.cache[require.resolve(`./${command}.js`)];

		try {
			const newCommand = require(`./${command}.js`);
			msg.channel.send(`Command '${command}' was reloaded!`);
		} catch (error) {
			console.log(error);
			msg.channel.send(`There was an error while reloading a command '${command}':\n\`${error.message}\``);
		}
	},
};
