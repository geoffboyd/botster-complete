const { PermissionsBitField } = require('discord.js');

module.exports = {
	name: 'prune',
	description: 'Deletes the previous [number] messages (Max: 99)',
	adminOnly: true,
	visible: true,
	execute(msg, args) {
		args.shift();
		if (!msg.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) { return msg.reply("You're not the boss of me.") }
		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount) || !amount || amount <= 1 || amount > 100) {
			return msg.reply('you need to input a number between 1 and 99.');
		}
		msg.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			msg.channel.send('there was an error trying to prune messages in this channel!');
		});

	},
};
