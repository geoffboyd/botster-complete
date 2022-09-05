```
 _           _       _             
| |         | |     | |           
| |__   ___ | |_ ___| |_ ___ _ __
| '_ \ / _ \| __/ __| __/ _ \ '__|
| |_) | (_) | |_\__ \ ||  __/ |   
|_.__/ \___/ \__|___/\__\___|_|   
      powered by Discord.JS v14
```                                
# botster v1.0
Chatbot for Discord and IRC

## Add botster to your Discord server, no setup required!
[Click here](https://discord.com/api/oauth2/authorize?client_id=724806991947497554&permissions=8&scope=bot) to add botster directly to your Discord server now without having to set up an environment to run the bot yourself. If you'd rather self-host, keep reading below.

## Installation
1. Clone repo && `cd` into directory
2. `npm install`
3. Edit discConfig.json and ircConfig.json files in ./conf to meet your needs
4. Start the bots
  * For Discord: `cd discord-botster && node discord-botster.js`
  * For IRC: `cd irc-botster && node irc-botster.js`
  * Alternatively, use PM2 to run the bot in the background (this is best practice)
    * For Discord: `cd discord-botster && pm2 discord-botster.js`
    * For IRC: `cd irc-botster && pm2 irc-botster.js`


Note in case you choose to get rid of the existing database: You'll want to add a fortune, insult, or 8 ball prediction to generate the table to start collecting those things. The easiest way is just to run the insultadd command.

## See README.md in the `discord-botster` and `irc-botster` for more info

## License

MIT License

Copyright (c) 2022 Geoff Boyd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Also, all glory to Hypnotoad.
