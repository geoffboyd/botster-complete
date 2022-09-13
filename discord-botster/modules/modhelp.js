const { config, prefix } = require("../../conf/discConfig.json");
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'modhelp',
  description: 'Display Commands for Mods & Admins',
  adminOnly: true,
  visible: true,
  execute(message, args, generalCommands, adminCommands) {
    // You can only use this command if you have the privileges to do so
    if (!msg.member.permissions.has(PermissionsBitField.Flags.ManageChannels, true)) { return msg.reply("https://media.giphy.com/media/VdWkLbTcqmw324kYFL/giphy.gif") }
    // If we have too many commands in the list, our embed will fail. 25 is the max, and I'm using 3 already, so 22 is the max we can allow in the array.
    // If anyone has too many commands in their list, maybe add another flag to each module to categorize them into groups. That's on you.
    if (adminCommands.length > 22) {
      let adminCommandList = [];
      for (let command of adminCommands) {
        adminCommandList.push(command.name)
      }
      return message.channel.send(`Too many commands for me to embed! I'll just provide a list.\n\n${genCommandList.join(', ')}`)
    }

    let helpMessageEmbed = new EmbedBuilder()
                                    .setColor(0xa34100)
                                    .setTitle('botster command list')
                                    .setThumbnail('https://i.postimg.cc/3r1s23LS/botster.png')
                                    .addFields(
                                      {
                                        name: '__Admin & Mod Commands__',
                                        value: ' - *Privileged users only*',
                                      },
                                    )
                                    .addFields(adminCommands)
    message.channel.send({ embeds: [helpMessageEmbed] });
  },
};
