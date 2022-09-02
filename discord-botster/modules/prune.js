module.exports = {
	name: 'prune',
	description: 'Prune up to 99 messages.',
	execute(message, args) {
		if (message.member.permissions.has("MANAGE_MESSAGES")) {
			const amount = parseInt(args[0]) + 1;
			if (isNaN(amount) || !amount || amount <= 1 || amount > 100) {
				return message.reply('you need to input a number between 1 and 99.');
			}
			message.channel.bulkDelete(amount, true).catch(err => {
				console.error(err);
				message.channel.send('there was an error trying to prune messages in this channel!');
			});
		} else {
			return message.reply("You're not the boss of me.");
		}
	},
};
