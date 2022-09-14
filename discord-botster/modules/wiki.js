module.exports = {
  name: 'wiki',
  description: 'Wikipedia lookup',
  adminOnly: false,
  visible: true,
  execute(message, args) {
    const wiki = require('wikipedia');
    args.shift();
    if (args[1]) {
      for (let i=0; i<args.length; i++) {
        let firstLetter = args[i].slice(0,1);
        let restOfWord = args[i].slice(1, args[i].length);
        firstLetter = firstLetter.toUpperCase();
        args[i] = firstLetter + restOfWord;
      }
    }
    let search = args.join(' ');
    (async () => {
    	try {
    		const page = await wiki.page(search);
    		const summary = await page.summary();
        const entries = Object.entries(summary);
        let extract;
        for (entry of entries) {
          if (entry[0] !== 'extract') {continue} else {extract = entry[1]}
        }
        message.channel.send(extract);
    	} catch (error) {
    		console.log(error);
    	}
    })();
  }
};
