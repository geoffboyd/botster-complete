module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	execute(message, args, commandNames) {
		const command = args[1].toLowerCase();

		if (!commandNames.includes(command)) {
			return message.channel.send(`There is no command with name or alias \`${command}\`, ${message.author.username}!`);
		}

		delete require.cache[require.resolve(`./${command}.js`)];

		try {
			const newCommand = require(`./${command}.js`);
			message.channel.send(`Command '${command}' was reloaded!`);
		} catch (error) {
			console.log(error);
			message.channel.send(`There was an error while reloading a command '${command}':\n\`${error.message}\``);
		}
	},
};
