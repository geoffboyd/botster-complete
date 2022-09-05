module.exports = {
  getinfo(msg, args, type) {
    const SQLite = require("better-sqlite3");
    const db = new SQLite('./db/userinputs.sqlite');
    // Check if the table "userinputs" exists and has content from this guild.
    const table = db.prepare(`SELECT count(*) FROM userinputs WHERE (channel = ${msg.guild.id} OR channel = 'Global') AND type = '${type}';`).get();
    if (!table['count(*)']) {
      return msg.channel.send("I don't have any 8 Ball predictions yet");
    }
    const rawInfo = db.prepare(`SELECT * FROM userinputs WHERE (channel = ${msg.guild.id} OR channel = 'Global') AND type='${type}' ORDER BY lastUsed DESC LIMIT 1;`).get();
    const rawDateAdded = rawInfo['dateAdded'];
    const dateObj = new Date(rawDateAdded * 1000);
    const utcString = dateObj.toUTCString();
    msg.channel.send(`The last ${type} was ID ${rawInfo['row']} and said "${rawInfo['content']}", which was added by ${rawInfo['user']} on ${utcString}.`);
  }
}
