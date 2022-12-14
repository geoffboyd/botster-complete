module.exports = {
  name: 'draconic',
  description: 'English to Draconic translator',
  execute(bot, channel, args, from, to) {
    const SQLite = require("better-sqlite3");
    const db = new SQLite('../db/userinputs.sqlite');
    // Check if the table "dbuages" exists.
    const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'draconic';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      db.prepare("CREATE TABLE draconic (row INTEGER NOT NULL PRIMARY KEY, common TEXT, draconic TEXT, notes TEXT, author TEXT);").run();
      // Ensure that the "row" row is always unique and indexed.
      db.prepare("CREATE UNIQUE INDEX idx_draconic_row ON draconic (row);").run();
      db.pragma("synchronous = 1");
      db.pragma("journal_mode = wal");
    }
    args.shift();
    text = args.join(' ').toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");;
    let words = text.split(' ');
    let draconicPhrase = [];
    if (words.length < 1) {
    	bot.say(channel, 'What am I translating here?');
    } else {
    	for (c=0; c<words.length; c++) {
	   		//check for word mapping in DB, if found, add to draconicPhrase array
   			var dracWord = db.prepare(`SELECT * FROM draconic WHERE common = '${words[c]}';`).get();
   			if (dracWord){
				draconicPhrase.push(dracWord['draconic']);
			} else {
				draconicPhrase.push(words[c]);
			}
		}
		draconicPhrase = draconicPhrase.join(' ');
		bot.say(channel, draconicPhrase);
    }
  }
};
