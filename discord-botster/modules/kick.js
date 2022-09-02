module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them.',
	guildOnly: true,
	execute(message) {
		const taggedUser = message.mentions.members.first();
		if (message.member.permissions.has("KICK_MEMBERS")) {
			if (!taggedUser) {
				return message.reply('you need to tag a user in order to kick them!');
			} else if (!taggedUser.permissions.has("BAN_MEMBERS")) {
				taggedUser.kick();
				return message.channel.send(`Byeeeeeee ${message.mentions.members.first()}, you just got kicked`);
			} else {
				return message.reply("https://media.giphy.com/media/VdWkLbTcqmw324kYFL/giphy.gif");
			}
		} else {
			return message.reply("https://media.giphy.com/media/VdWkLbTcqmw324kYFL/giphy.gif");
		};
	},
};
