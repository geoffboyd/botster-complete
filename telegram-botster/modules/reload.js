module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	execute(bot, channel, from, text, commandNames) {
		let args = text.split(' ');
		if (!args[1]) { return bot.telegram.sendMessage(channel, "You didn't provide a command name to reload"); }
		const command = args[1].toLowerCase();

		if (!commandNames.includes(command)) {
			return bot.telegram.sendMessage(channel, `There is no command with name or alias \`${command}\`, ${msg.author.username}!`);
		}

		delete require.cache[require.resolve(`./${command}.js`)];

		try {
			const newCommand = require(`./${command}.js`);
			bot.telegram.sendMessage(channel, `Command '${command}' was reloaded!`);
		} catch (error) {
			console.log(error);
			bot.telegram.sendMessage(channel, `There was an error while reloading a command '${command}':\n\`${error.message}\``);
		}
	},
};
