module.exports = {
  execute(bot, channel, args, from, to) {
    args.shift();
    if (!args[0]) { return bot.say(channel, 'Tell me a story and leave out some words. If you are lucky my return will sound absurd. In their place type (verb), (adjective) or (noun) and perhaps what I’ll report will sound more profound'); }
    let madlibPhrase = args.join(' ');
    const SQLite = require("better-sqlite3");
    const db = new SQLite('../db/userinputs.sqlite');
    const wordTypes = ['noun','name','place','verb','adjective','adverb'];

    // Check if the table dictionary exists and has content.
    const table = db.prepare(`SELECT count(*) FROM dictionary`).get();
    if (!table['count(*)']) { return bot.say(channel, "Uh oh, my dictionary is empty :("); }

    for (let i=0; i<wordTypes.length; i++){
      let searchKey = `(${wordTypes[i]})`;
      while (madlibPhrase.includes(searchKey)) {
        let newWord = db.prepare(`SELECT word FROM dictionary WHERE ${wordTypes[i]}='true' ORDER BY RANDOM() LIMIT 1;`).pluck().all();
        madlibPhrase = madlibPhrase.replace(searchKey, newWord);
      }
    }
    let firstLetter = madlibPhrase.slice(0, 1);
    firstLetter = firstLetter.toUpperCase();
    let restOfPhrase = madlibPhrase.slice(1, madlibPhrase.length);
    madlibPhrase = firstLetter + restOfPhrase;
    bot.say(channel, madlibPhrase);
  }
}
