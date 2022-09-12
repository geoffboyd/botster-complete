const { config, prefix } = require("../../conf/discConfig.json");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Display Commands',
  adminOnly: false,
  visible: true,
  execute(message, args, generalCommands, adminCommands) {
    // If we have too many commands in the list, our embed will fail. 25 is the max, and I'm using 3 already, so 22 is the max we can allow in the array.
    // If anyone has too many commands in their list, maybe add another flag to each module to categorize them into groups. That's on you.
    if (generalCommands.length > 22) {
      let genCommandList = [];
      for (let command of generalCommands) {
        genCommandList.push(command.name)
      }
      return message.channel.send(`Too many commands for me to embed! I'll just provide a list.\n\n${genCommandList.join(', ')}`)
    }

    let helpMessageEmbed = new EmbedBuilder()
                                    .setColor(0xa34100)
                                    .setTitle('botster command list')
                                    .setThumbnail('https://i.postimg.cc/3r1s23LS/botster.png')
                                    .addFields(
                                      {
                                        name: '__General Commands__',
                                        value: ' - *These can be used by anyone*',
                                      },
                                    )
                                    .addFields(generalCommands)
                                    .addFields(
                                      { name: '\u200B', value: '\u200B' },
                                      {
                                        name: '__Admin & Mod Commands__',
                                        value: `Try \`${prefix}modhelp\` for a list of privileged commands`,
                                      },
                                    )
    message.channel.send({ embeds: [helpMessageEmbed] });
  },
};
