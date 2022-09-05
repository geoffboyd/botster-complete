/*
 _           _       _
| |         | |     | |
| |__   ___ | |_ ___| |_ ___ _ __
| '_ \ / _ \| __/ __| __/ _ \ '__|
| |_) | (_) | |_\__ \ ||  __/ |
|_.__/ \___/ \__|___/\__\___|_|

Discord botster v1.0rc using DiscordJS V14
*/

const fs = require('fs');
const { prefix, token, owner } = require('../conf/config.json');
const SQLite = require("better-sqlite3");
const db = new SQLite('../db/userinputs.sqlite');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

// I didn't write this function, it is plagiarismed.
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord
client.login(token);
