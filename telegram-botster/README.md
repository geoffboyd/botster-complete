```
 _           _       _             
| |         | |     | |           
| |__   ___ | |_ ___| |_ ___ _ __
| '_ \ / _ \| __/ __| __/ _ \ '__|
| |_) | (_) | |_\__ \ ||  __/ |   
|_.__/ \___/ \__|___/\__\___|_|   

```                                
# telegram-botster v1.0rc
Chatbot for Telegram

## Commands and usage
The default prefix to send a bot command is `.`. You can change that in `./conf/tgConfig.jason` to instead use whatever character you choose. I'm going to use `.` below for my notation, but replace that with whatever you choose for your instance.
- `.8ball` - Asks a Magic Eightball for guidance. Feed it a yes or no question, or just think your question. It knows all.
- `.8balladd [new eightball prediction]` - Feed the Magic Eightball with new replies. Try using links to GIFs, too!
- `.8ballinfo` - Tells you who added the most recently seen 8ball prediction, the database row it is saved on, and when it was added.
- `.coin` - Flips a coin.
- `.collatz [number]` - Solves the [Collatz Conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture) for a given number.
- `.dbremove [row number]` - When you use any of the info commands (8ballinfo, fcinfo, insultinfo), they tell you the database row that the response is stored in. Server owners can remove responses by using this command. Doesn't work for responses labeled "Global".
- `.dice` - Rolls a 6-sided die by default. If you add a number to the command, like `.8ball 20`, it rolls a die with the specified number of sides.
- `.draconic` - Translate text from English into Draconic.
- `.fortune` - Open a fortune cookie, see your fortune.
- `.fcadd` - Add new fortunes for future fortune cookies.
- `.fcinfo` - Tells you who added the most recently seen fortune, the database row it is saved on, and when it was added.
- `.help` - Shows a helpful list of commands.
- `.insult [optional: tag a target]` - Insults either you or the person you target.
- `.insultadd` - Add new insults. By default, the insult target will be the first word.
  - To include the target's name elsewhere, use `{}` in the place you want their name to appear.
  - Example: `.insultadd You know when {} shows up to the party, it's time to leave.`
- `.insultinfo` - Tells you who added the most recently seen insult, the database row it is saved on, and when it was added.
- `.josephus [number] [skips]` - Solves the [Josephus Problem](https://en.wikipedia.org/wiki/Josephus_problem) for a given number. Optionally change the number of skips between eliminations.
- `.kick [tagged user]` - For moderators and admins, use this command to kick a user.
- `.prune [number]` - For moderators and admins, use this command to batch delete the most recent messages on a channel, up to 100 messages.
- `.reload` - For the person running the bot, use this to reload commands instead of restarting the bot entirely.
- `.rr [optional: tagged user]` - Rick Roll someone. Or don't. Maybe don't use this one.
- `.slap [someone]` - Slap someone around a little bit.
- `.wookiee` - Translate text into Wookiee.

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
