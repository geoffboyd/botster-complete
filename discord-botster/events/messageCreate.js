const { ChannelType } = require('discord.js');
const { prefix } = require('../conf/config.json');
const SQLite = require("better-sqlite3");
const db = new SQLite('./db/userinputs.sqlite');
const fs = require('fs');
const MarkovChain = require('markovchain');
const commandFiles = fs.readdirSync('./modules/').filter(file => file.endsWith('.js'));
let commandNames = [];
for (const file of commandFiles) {
  const command = require(`../modules/${file}`);
  commandNames.push(file.replace('.js', ''));
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

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
    if (message.channel.type !== ChannelType.GuildText) { return };
    if (message.author.bot) { return };
    const guild = message.guild.id;
    const channel = message.channel.id;
    const content = message.content;
    let args = content.split(' ');
    let botName = message.guild.members.me.displayName

    // Markov chain
    let wordSalad = new MarkovChain(db.prepare(`SELECT content FROM chats WHERE channel = '${guild}' ORDER BY RANDOM();`).pluck().all().join(' '));
    const triggerWords = [botName.toLowerCase(), 'audio', 'tech', 'excuse'];
    const randomFuckery = Math.ceil(Math.random()*30);

    // If the text doesn't start with a prefix, it's not a command, we should just log what we see and then be quiet (Unless botName is invoked or randomFuckery has something to say about it...)
    if (!content.startsWith(prefix)){
      // write text and from to the database
      chatLog(channel, content, message.author.id);;
      if (randomFuckery !== 10 && !triggerWords.some(e => message.content.toLowerCase().includes(e))) { return };
    }
    if (!content.startsWith(prefix) && ((content.toLowerCase().includes(botName.toLowerCase()) || randomFuckery === 10))) {
      //Markov chain triggers here
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

    let lowerCaseArgs = content.trim().toLowerCase().split(' ');
    let commandAttempt = lowerCaseArgs[0].substring(1);

    // Still need to rewrite the function to count how many servers I'm active on
/*
     if (commandAttempt === 'servers') { return client.channel.send('Right now, I am active on ' + client.guilds.cache.size + ' servers.'); }
*/

    if (content.includes('audio') || content.includes('tech') || content.includes('excuse')) {
      let thisCommand = require(`../modules/jargon.js`);
      let type = content.includes('audio') ? 'audio'
               : content.includes('tech') ? 'technical'
               : 'excuse'
      return thisCommand.execute(message, args, type);
    }

    if (!commandNames.includes(commandAttempt)){ return console.log('\x1b[31m%s\x1b[0m', `${message.author.username} attempted to use a command that doesn't exist: ${commandAttempt}`) }
    const commandToRun = require(`../modules/${commandAttempt}.js`);
    commandToRun.execute(message, args, commandNames);
	},
};
