module.exports = {
  getinfo(bot, channel, type) {
    const SQLite = require("better-sqlite3");
    const db = new SQLite('../db/userinputs.sqlite');
    // Check if the table "userinputs" exists and has content from this guild.
    const table = db.prepare(`SELECT count(*) FROM userinputs WHERE (channel = ${channel} OR channel = 'Global') AND type = '${type}';`).get();
    if (!table['count(*)']) {
      return bot.telegram.sendMessage(channel, "I don't have any 8 Ball predictions yet");
    }
    const rawInfo = db.prepare(`SELECT * FROM userinputs WHERE (channel = ${channel} OR channel = 'Global') AND type='${type}' ORDER BY lastUsed DESC LIMIT 1;`).get();
    const rawDateAdded = rawInfo['dateAdded'];
    const dateObj = new Date(rawDateAdded * 1000);
    const utcString = dateObj.toUTCString();
    bot.telegram.sendMessage(channel, `The last ${type} was ID ${rawInfo['row']} and said "${rawInfo['content']}", which was added by ${rawInfo['user']} on ${utcString}.`);
  }
}
