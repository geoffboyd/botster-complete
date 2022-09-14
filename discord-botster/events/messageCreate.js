// Let's grab all the stuff we need to include from elsewhere
const { ChannelType } = require('discord.js');
const { prefix } = require('../../conf/discConfig.json');
const SQLite = require("better-sqlite3");
const db = new SQLite('../db/userinputs.sqlite');
const fs = require('fs');
const MarkovChain = require('markovchain');

// Checking for commands and building out arrays for general use commands and admin-only commands
// We'll pass this all along to the help commands too, so it can dynamically build our help message
const commandFiles = fs.readdirSync('./modules/').filter(file => file.endsWith('.js'));
let generalCommands = [];
let adminCommands = [];
let allCommands = [generalCommands, adminCommands];
for (const file of commandFiles) {
  const command = require(`../modules/${file}`);
  if (!command.visible) { continue; }
  let commandField = { name: command.name, value: command.description, inline: true }
  if (command.adminOnly) {
    adminCommands.push(commandField)
  } else {
    generalCommands.push(commandField)
  }
}

// This is going to clean up the presentation of our help commands
for (const commandList of allCommands) {
  if (commandList.length%3 === 1) {
    commandList.splice(commandList.length, 0, { name: '\u200B', value: '\u200B', inline: true });
    commandList.splice(commandList.length-2, 0, { name: '\u200B', value: '\u200B', inline: true })
  }
  if (commandList.length%3 === 2) {
    commandList.splice(commandList.length-1, 0, { name: '\u200B', value: '\u200B', inline: true });
  }
}

// Function to write chat messages to the database, CURRENTLY NOT WORKING
function chatLog(channel, text, from) {
    // Check if the table "chats" exists.
    const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'chats';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      db.prepare('CREATE TABLE chats (row INTEGER NOT NULL PRIMARY KEY, user TEXT, channel TEXT, content TEXT, dateAdded DATETIME);').run();
      // Ensure that the "row" row is always unique and indexed.
      db.prepare('CREATE UNIQUE INDEX idx_chatalog_row ON chatalog (row);').run();
      db.pragma('synchronous = 1');
      db.pragma('journal_mode = wal');
    }
    let addInputs = db.prepare('INSERT INTO chats (user, channel, content, dateAdded) VALUES (@user, @channel, @content, @dateAdded);');
    let date = Math.floor(new Date() / 1000);
    const chatalogObject = { user: `${from}`, channel: `${channel}`, content: `${text}`, dateAdded: `${date}` };
    addInputs.run(chatalogObject);
}

// Time for the main event. We received a message. It's go time!
module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
    // Guard clauses. If we get a message from a bot, ignore it. Same for messages outside of text channels.
    if (message.channel.type !== ChannelType.GuildText) { return };
    if (message.author.bot) { return };

    // Grab some important bits of info and section it out for later
    const guild = message.guild.id;
    const channel = message.channel.id;
    const content = message.content;
    let args = content.split(' ');
    let botName = message.guild.members.me.displayName

    // If the bot owner needs to reload a command, this will make sure it gets taken care of first.
    if (content.startsWith('.reload')) {
      const reload = require('../modules/reload.js');
      reload.execute(message, content.split(' '), generalCommands, adminCommands);
    }

    // If the bot owner needs to restart the bot, this will make sure it also gets top priority.
    if (content.startsWith('.restart')) {
      const restart = require('../modules/restart.js');
      return restart.execute(message, content.split(' '));
    }

    // Some important sensors for our gibberish triggers
    const triggerWords = [botName.toLowerCase(), 'audio', 'tech', 'excuse'];
    const randomFuckery = Math.ceil(Math.random()*30);

    // If the text doesn't start with a prefix, it's not a command, we should just log what we see and then be quiet (Unless botName is invoked or randomFuckery has something to say about it...)
    if (!content.startsWith(prefix)){
      // write text and from to the database
      chatLog(channel, content, message.author.id);;
      if (randomFuckery !== 10 && !triggerWords.some(e => message.content.toLowerCase().includes(e))) { return };
    }
    // No prefix, but someone said the botName and/or randomFuckery is afoot? Markov chain triggers here
    if (!content.startsWith(prefix) && ((content.toLowerCase().includes(botName.toLowerCase()) || randomFuckery === 10))) {
      let wordSalad = new MarkovChain(db.prepare(`SELECT content FROM chats WHERE channel = '${guild}' ORDER BY RANDOM();`).pluck().all().join(' '));
      let markovArgs = content.split(' ');
      let startWord = message.author.username;
      let phraseLength = (Math.ceil(Math.random()*((markovArgs.length + 10)*2)));
      if (markovArgs[1]) {
        if (markovArgs[1].toLowerCase().includes(botName.toLowerCase())) {
          startWord = markovArgs[0];
        } else {
          startWord = markovArgs[Math.floor(Math.random()*args.length)];
        }
      }

      let phrase = wordSalad.start(startWord).end(phraseLength).process();
      let firstLetter = phrase.slice(0, 1);
      firstLetter = firstLetter.toUpperCase();
      let restOfPhrase = phrase.slice(1, phrase.length);
      phrase = firstLetter + restOfPhrase;
      while (phrase.endsWith('?') || phrase.endsWith('.') || phrase.endsWith('!') || phrase.endsWith('"') || phrase.endsWith(',')) {
        phrase = phrase.slice(0, -1);
      }
      const punct = ['.','?','!']
      message.channel.sendTyping();
      setTimeout(function(){
        message.channel.send(phrase+punct[Math.floor(Math.random()*punct.length)]);
      }, 2000);
      return
    }

    if (content.includes('audio') || content.includes('tech') || content.includes('excuse')) {
      let thisCommand = require(`../modules/jargon.js`);
      let type = content.includes('audio') ? 'audio'
               : content.includes('tech') ? 'technical'
               : 'excuse'
      return thisCommand.execute(message, args, type);
    }

    // If we made it this far, someone is probably trying to run a command. Let's see if we can find it.
    let commandAttempt = content.trim().toLowerCase().split(' ').shift().substring(1);
    if (!generalCommands.find(o => o.name === commandAttempt) && !adminCommands.find(o => o.name === commandAttempt)) { return console.log('\x1b[31m%s\x1b[0m', `${message.author.username} attempted to use a command that doesn't exist: ${commandAttempt}`) }
    // Found it? Time to run it.
    const commandToRun = require(`../modules/${commandAttempt}.js`);
    commandToRun.execute(message, args, generalCommands, adminCommands);
	},
};
