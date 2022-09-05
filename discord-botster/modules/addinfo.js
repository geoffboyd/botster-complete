module.exports = {
  contentinfo(msg, args, contentType, phrase) {
    const SQLite = require("better-sqlite3");
    const db = new SQLite('./db/userinputs.sqlite');
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
    let addInputs = db.prepare("INSERT INTO userinputs (user, channel, type, content, lastUsed, dateAdded) VALUES (@user, @channel, @type, @content, @lastUsed, @dateAdded);");
    let content = msg.content.split(' ');
    content.shift();
    content = content.join(' ');
    let date = Math.floor(new Date() / 1000);
    const dbObject = { user: msg.member.user.tag, channel: msg.guild.id, type: `${contentType}`, content: `${content}`, lastUsed: `${date}`, dateAdded: `${date}` };
    if (content.length > 0) {
      addInputs.run(dbObject);
      msg.channel.send(`A new ${phrase} has been added!`);
    } else {
      msg.channel.send(`You need to tell me the ${phrase} to add!`);
    }
  }
}
