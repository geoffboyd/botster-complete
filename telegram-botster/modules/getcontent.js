module.exports = {
  getcontent(bot, channel, from, text, type) {
    let args = text.split(' ');
    args.shift();
    const SQLite = require("better-sqlite3");
    const db = new SQLite('../db/userinputs.sqlite');
    // Check if the table "userinputs" exists and has content from this guild.
    const table = db.prepare(`SELECT count(*) FROM userinputs WHERE (channel = ${channel} OR channel = 'Global') AND type = '${type}';`).get();
    if (!table['count(*)']) {
      return bot.telegram.sendMessage(channel, "I don't have any insults yet");
    }
    let date = Math.floor(new Date() / 1000);
    const rawResult = db.prepare(`SELECT * FROM userinputs WHERE type = '${type}' AND (channel = ${channel} OR channel = 'Global') ORDER BY RANDOM() LIMIT 1;`).get();
    const content = rawResult['content'];
    const contentID = rawResult['row'];
    if (type == 'insult') {
      let target = args[0] ? args[0] : from;
      let finalInsult = content.includes('{}') ? content.replace('{}', target) : `${target} ${content}`;

      bot.telegram.sendChatAction(channel, action="typing");
      setTimeout(function(){
        bot.telegram.sendMessage(channel, finalInsult);
      }, 2500);
    } else {
      bot.telegram.sendChatAction(channel, action="typing");
      setTimeout(function(){
        bot.telegram.sendMessage(channel, content);
      }, 2000);
    }
    db.prepare('UPDATE userinputs SET lastUsed = ? WHERE row = ?').run(date,contentID);
  }
}
