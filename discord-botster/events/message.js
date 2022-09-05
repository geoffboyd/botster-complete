module.exports = {
	name: 'message',
	once: true,
	execute(client) {
    console.log('Roger roger, I\'m reading you loud and clear');
  /*
    if (message.channel.type !== "GUILD_TEXT") { return };
    if (message.author.bot) { return };
    const channel = message.guild.id;
    let botName = message.guild.me.nickname ? message.guild.me.nickname : client.user.username;
    // Markov chain
    let wordSalad = new MarkovChain(db.prepare(`SELECT content FROM chats WHERE channel = '${channel}' ORDER BY RANDOM();`).pluck().all().join(' '));
    const triggerWords = [botName.toLowerCase(), 'audio', 'tech', 'excuse'];
    const randomFuckery = Math.ceil(Math.random()*30);

    // If the text doesn't start with a prefix, it's not a command, we should just log what we see and then be quiet (Unless botName is invoked or randomFuckery has something to say about it...)
    if (!message.content.startsWith(prefix)){
      // write text and from to the database
      chatLog(channel, message.content, message.author.username);
      if (randomFuckery !== 10 && !triggerWords.some(e => message.content.toLowerCase().includes(e))) { return };
    }

    if (!message.content.startsWith(prefix) && ((message.content.toLowerCase().includes(botName.toLowerCase()) || randomFuckery === 10))) {
      //Markov chain triggers here
      let markovArgs = message.content.split(' ');
      let startWord = message.author.username;
      let phraseLength = (Math.ceil(Math.random()*((markovArgs.length + 10)*2)));
      if (markovArgs[1]) {
        if (markovArgs[1].toLowerCase().includes(botName.toLowerCase())) {
          startWord = markovArgs[0];
        } else {
          startWord = markovArgs[Math.floor(Math.random()*args.length)];
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
      message.channel.sendTyping();
      setTimeout(function(){
        message.channel.send(phrase+punct[Math.floor(Math.random()*punct.length)]);
      }, 2000);
      return
    }

    let args = message.content.trim().toLowerCase().split(' ');
    let commandAttempt = args[0].substring(1);

    if (commandAttempt === 'servers') { return message.channel.send('Right now, I am active on ' + client.guilds.cache.size + ' servers.'); }

    if (message.content.includes('audio') || message.content.includes('tech') || message.content.includes('excuse')) {
      let thisCommand = require(`./modules/jargon.js`);
      let type = message.content.includes('audio') ? 'audio'
               : message.content.includes('tech') ? 'technical'
               : 'excuse'
      return thisCommand.execute(message, args, type);
    }

    if (!commandNames.includes(commandAttempt)){ return console.log('\x1b[31m%s\x1b[0m', `${message.author.username} attempted to use a command that doesn't exist: ${commandAttempt}`) }
    const commandToRun = require(`./modules/${commandAttempt}.js`);
    commandToRun.execute(message, args, commandNames);
  */
	},
};
