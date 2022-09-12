const { config, prefix } = require("../../conf/discConfig.json");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'modhelp',
  description: 'Display Commands for Mods & Admins',
  adminOnly: true,
  visible: true,
  execute(message, args, generalCommands, adminCommands) {
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
