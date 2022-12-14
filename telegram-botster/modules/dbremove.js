const { PermissionsBitField } = require('discord.js');
const SQLite = require("better-sqlite3");
const db = new SQLite('../db/userinputs.sqlite');

module.exports = {
  name: 'dbremove',
  description: 'Delete something from the userinputs database',
  execute(bot, channel, from, text, commandNames) {
    let args = text.split(' ');
    args.shift();
    if (isNaN(args[0])) { return bot.telegram.sendMessage(channel, "You didn't enter an ID number"); }
    // Check if the table "userinputs" exists.
    const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'userinputs';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      db.prepare("CREATE TABLE userinputs (row INTEGER NOT NULL PRIMARY KEY, user TEXT, channel TEXT, type TEXT, content TEXT, lastUsed DATETIME, dateAdded DATETIME);").run();
      // Ensure that the "row" row is always unique and indexed.
      db.prepare("CREATE UNIQUE INDEX idx_userinputs_row ON userinputs (row);").run();
      db.pragma("synchronous = 1");
      db.pragma("journal_mode = wal");
    }
    const item = db.prepare("SELECT * FROM userinputs WHERE row = ?;").get(args[0]);
    if (item.channel !== channel) { return bot.telegram.sendMessage(channel, "You can only delete items from this channel."); }
    db.prepare("DELETE FROM userinputs WHERE row = ?").run(args[0]);
    if (!table['count(*)']) { return bot.telegram.sendMessage(channel, 'There is nothing to delete...') }
    bot.telegram.sendMessage(channel, 'Item deleted!');
  },
};
