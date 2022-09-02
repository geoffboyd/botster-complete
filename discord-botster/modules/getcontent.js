module.exports = {
  getcontent(msg, args, type) {
    const SQLite = require("better-sqlite3");
    const db = new SQLite('../db/userinputs.sqlite');
    // Check if the table "userinputs" exists and has content from this guild.
    const table = db.prepare(`SELECT count(*) FROM userinputs WHERE (channel = ${msg.guild.id} OR channel = 'Global') AND type = '${type}';`).get();
    if (!table['count(*)']) {
      return msg.channel.send("I don't have any insults yet");
    }
    var date = Math.floor(new Date() / 1000);
    const rawResult = db.prepare(`SELECT * FROM userinputs WHERE type = '${type}' AND (channel = ${msg.guild.id} OR channel = 'Global') ORDER BY RANDOM() LIMIT 1;`).get();
    const content = rawResult['content'];
    const contentID = rawResult['row'];
     if (type == 'insult') {
      if (args[0]) {
        var target = args[0];
      } else {
        var target = msg.author.username;
      }
      if (content.includes('{}')) {
        var finalInsult = content.replace('{}', target);
      } else {
        var finalInsult = target + ' ' + content;
      }
      msg.channel.sendTyping();
      setTimeout(function(){
      	msg.channel.send(finalInsult);
      }, 2000);
    } else {
      msg.channel.sendTyping();
      setTimeout(function(){
        msg.channel.send(content);
      }, 2000);
    }
    db.prepare('UPDATE userinputs SET lastUsed = ? WHERE row = ?').run(date,contentID);
  }
}
