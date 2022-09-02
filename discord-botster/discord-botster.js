const fs = require('fs');
const { prefix, token, owner } = require('./conf/config.json');
const SQLite = require("better-sqlite3");
const db = new SQLite('../db/userinputs.sqlite');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const MarkovChain = require('markovchain');
const commandFiles = fs.readdirSync('./modules/').filter(file => file.endsWith('.js'));

let commandNames = [];
for (const file of commandFiles) {
  const command = require(`./modules/${file}`);
  commandNames.push(file.replace('.js', ''));
}

client.once('ready', () => {
  // Check if the table "chats" exists.
  const chats = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'chats';").get();
  if (!chats['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    db.prepare('CREATE TABLE chats (row INTEGER NOT NULL PRIMARY KEY, user TEXT, channel TEXT, content TEXT, dateAdded DATETIME);').run();
    // Ensure that the "row" row is always unique and indexed.
    db.prepare('CREATE UNIQUE INDEX idx_chatalog_row ON chatalog (row);').run();
    db.pragma('synchronous = 1');
    db.pragma('journal_mode = wal');
  }
  const userInputs = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userinputs';").get();
  if (!userInputs['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    db.prepare('CREATE TABLE userinputs (row INTEGER NOT NULL PRIMARY KEY, user TEXT, channel TEXT, type TEXT, content TEXT, lastUsed DATETIME);').run();
    // Ensure that the "row" row is always unique and indexed.
    db.prepare('CREATE UNIQUE INDEX idx_userinputs_row ON userinputs (row);').run();
    db.pragma('synchronous = 1');
    db.pragma('journal_mode = wal');
  }
  console.log('\x1b[32m%s\x1b[0m', `${client.user.username} is online!`);
});

// When a message is received...
client.on('messageCreate', message => {
  if (message.channel.type !== "GUILD_TEXT") { return };
  if (message.author.bot) { return };
  const channel = message.guild.id;
  let botName = message.guild.me.nickname ? message.guild.me.nickname : client.user.username;
  // Markov chain
  let wordSalad = new MarkovChain(db.prepare(`SELECT content FROM chats WHERE channel = '${channel}' ORDER BY RANDOM();`).pluck().all().join(' '));
  const triggerWords = [botName.toLowerCase(), 'audio', 'tech', 'excuse'];
  const randomFuckery = Math.ceil(Math.random()*30);

  // If the text doesn't start with a prefix, it's not a command, we should just log what we see and then be quiet (Unless botName is invoked or randomFuckery has something to say about it...)
  if (!message.content.startsWith(prefix)){
    // write text and from to the database
    chatLog(channel, message.content, message.author.username);
    if (randomFuckery !== 10 && !triggerWords.some(e => message.content.toLowerCase().includes(e))) { return };
  }

  if (message.content.toLowerCase().includes(botName.toLowerCase()) || randomFuckery === 10) {
    //Markov chain triggers here
    let args = message.content.split(' ');
    let startWord = message.author.username;
    let phraseLength = (Math.ceil(Math.random()*((args.length + 10)*2)));
    if (args[1]) {
      if (args[1].toLowerCase().includes(botName.toLowerCase())) {
        startWord = args[0];
      } else {
        startWord = args[Math.floor(Math.random()*args.length)];
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

  args = message.content.trim().toLowerCase().split(' ');

  if (message.content.includes('audio') || message.content.includes('tech') || message.content.includes('excuse')) {
    let thisCommand = require(`./modules/jargon.js`);
    let type = message.content.includes('audio') ? 'audio'
             : message.content.includes('tech') ? 'technical'
             : 'excuse'
    return thisCommand.execute(message, args, type);
  }

  let commandAttempt = args[0].substring(1);
  if (!commandNames.includes(commandAttempt)){ return console.log('\x1b[31m%s\x1b[0m', `${message.author.username} attempted to use a command that doesn't exist: ${commandAttempt}`) }
  const commandToRun = require(`./modules/${commandAttempt}.js`);
  commandToRun.execute(message, args, commandNames);
});

// Function to write chat messages to the database
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

// Log in to Discord
client.login(token);
