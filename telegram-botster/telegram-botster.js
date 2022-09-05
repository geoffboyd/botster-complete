/*
 _           _       _
| |         | |     | |
| |__   ___ | |_ ___| |_ ___ _ __
| '_ \ / _ \| __/ __| __/ _ \ '__|
| |_) | (_) | |_\__ \ ||  __/ |
|_.__/ \___/ \__|___/\__\___|_|

Telegram botster v1.0
*/

const Telegraf = require('telegraf').Telegraf;
const { token, botName, prefix } = require('../conf/tgConf.json');
const bot = new Telegraf(token);
const MarkovChain = require('markovchain');
const fs = require('fs');
const SQLite = require("better-sqlite3");
const db = new SQLite('../db/userinputs.sqlite');
const wiki = require('wikijs').default;
const translate = require('@iamtraction/google-translate');
const ud = require('urban-dictionary');

let commandNames = [];
for (const file of commandFiles) {
  const command = require(`./modules/${file}`);
  commandNames.push(file.replace('.js', ''));
}

let args = [];

console.log('\x1b[32m%s\x1b[0m', `Signed in to Telegram.`);

bot.on('text', ctx => {
  if (ctx.message.from.is_bot) { return }
  const channel = ctx.chat.id;
  const from = ctx.message.from
  let text = ctx.message.text;

  // Markov chain
  let wordSalad = new MarkovChain(db.prepare(`SELECT content FROM chats WHERE channel = '${channel}' ORDER BY RANDOM();`).pluck().all().join(' '));
  const triggerWords = [botName.toLowerCase(), 'audio', 'tech', 'excuse'];
  const randomFuckery = Math.ceil(Math.random()*30);

  // If the text doesn't start with a prefix, it's not a command, we should just log what we see and then be quiet (Unless botName is invoked or randomFuckery has something to say about it...)
  if (!text.startsWith(prefix)){
    // write text and from to the database
    chatLog(channel, text, from);
    if (randomFuckery !== 10 && !triggerWords.some(e => text.toLowerCase().includes(e))) { return };
  }

  if (text.toLowerCase().includes(botName.toLowerCase()) || randomFuckery === 10) {
    //Markov chain triggers here
    let args = text.split(' ');
    let startWord = from;
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
    return bot.telegram.sendMessage(channel, phrase+punct[Math.floor(Math.random()*punct.length)]);
  }

  if (text.includes('audio') || text.includes('tech') || text.includes('excuse')) {
    let thisCommand = require(`./modules/jargon.js`);
    return thisCommand.execute(bot, channel, text.split(' '), from, to);
  }

  let commandAttempt = lowerCaseArgs[0].substring(1).toLowerCase();
  if (!commandNames.includes(commandAttempt)){ return console.log('\x1b[31m%s\x1b[0m', `${from} attempted to use a command that doesn't exist: ${commandAttempt}`) }
  const commandToRun = require(`./modules/${commandAttempt}.js`);
  commandToRun.execute(bot, channel, from, text, commandNames);
});

bot.on("left_chat_member", ctx => {
  bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
});

bot.launch();

// Add conversation to the Markov chain catalog
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
