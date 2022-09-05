const { ActivityType } = require('discord.js');
const SQLite = require("better-sqlite3");
const db = new SQLite('./db/userinputs.sqlite');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    client.user.setActivity('Discord chats', { type: ActivityType.Listening });
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
	},
};
