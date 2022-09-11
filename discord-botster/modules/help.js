const config = require("../../conf/discConfig.json");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Display Commands',
  execute(msg, args) {
    const helpMessageEmbed = new EmbedBuilder()
                                    .setColor(0xa34100)
                                    .setTitle('botster command list')
                                    .addFields(
                                      {
                                        name: '__General Commands__',
                                        value: ' - *These can be used by anyone*',
                                      },
                                      {
                                        name: `${config.prefix}8ball`,
                                        value: 'Ask the mystical Magic 8 Ball for guidance',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}8balladd`,
                                        value: 'Add new predictions to the Magic 8 Ball',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}8ballinfo`,
                                        value: 'Shows details about the most recent 8ball fortune',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}fortune`,
                                        value: 'Open a fortune cookie',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}fcadd`,
                                        value: 'Add new fortunes to the fortune cookie list',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}fcinfo`,
                                        value: 'Shows details about the most recent Fortune cookie fortune',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}insult [someone]`,
                                        value: 'Insults the person you tag',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}insultadd`,
                                        value: 'Add new insults',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}insultinfo`,
                                        value: 'Shows details about the most recent insult',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}coin`,
                                        value: 'Flip a coin',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}collatz [number]`,
                                        value: 'Solves the [Collatz conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture)',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}draconic`,
                                        value: 'English-to-Draconic translator',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}josephus [number] [skips]`,
                                        value: 'Solves the [Josephus problem](https://en.wikipedia.org/wiki/Josephus_problem). Optionally change number of skips.',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}madlibs`,
                                        value: 'Feed botster a MadLib using `(noun)`, `(verb)`, `(adjective)`, or `(adverb)`',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}roll`,
                                        value: 'Roll a die. Optionally choose number of sides or add a modifier.',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}rr [someone]`,
                                        value: 'Rick Roll someone',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}slap [someone]`,
                                        value: 'Slaps the person you tag',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}wookiee`,
                                        value: 'English-to-Wookiee translator',
                                        inline: true,
                                      },
                                      { name: '\u200B', value: '\u200B' },
                                      {
                                        name: '__Admin & Mod Commands__',
                                        value: ' - *Privileged users only*',
                                      },
                                      {
                                        name: `${config.prefix}prune [number]`,
                                        value: 'Deletes the previous [number] messages',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}kick [@member]`,
                                        value: 'Kicks the tagged member',
                                        inline: true,
                                      },
                                      {
                                        name: `${config.prefix}dbremove [message ID#]`,
                                        value: 'Delete a fortune, insult, or 8 Ball prediction from the database',
                                        inline: true,
                                      },
                                  	)
    msg.channel.send({ embeds: [helpMessageEmbed] });
  },
};
