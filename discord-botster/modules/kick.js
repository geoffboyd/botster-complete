const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'Kicks the tagged member',
	adminOnly: true,
	visible: true,
	execute(msg) {
		if (!msg.member.permissions.has(PermissionsBitField.Flags.KickMembers, true)) { return msg.reply("https://media.giphy.com/media/VdWkLbTcqmw324kYFL/giphy.gif") }
		const taggedUser = msg.mentions.users.first().id;
		if (!taggedUser) { return msg.reply('you need to tag a user in order to kick them!'); }
		try {
			msg.guild.members.cache.get(taggedUser).kick();
			const kickMessageEmbed = new EmbedBuilder()
																			.setColor(0xFF0000)
																			.addFields(
																				{
																					name: 'Ya burnt...',
																					value: `See ya, ${msg.mentions.users.first().username}!`
																				}
																			)
																			.setImage('https://c.tenor.com/Arsu0w_nD2EAAAAC/bob-anakshie.gif');
			msg.channel.send({ embeds: [kickMessageEmbed] });
		} catch (e) {
			console.log(e);
			return msg.reply("Something went wrong...");
		}
	},
};
