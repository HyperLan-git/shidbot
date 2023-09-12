const discord = require('discord.js');
const opus = require('@discordjs/opus');
const config = require('./config.js');
const App = require('./app.js');

GatewayIntentBits = discord.GatewayIntentBits;

const client = new discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

a = new App(client);

a.registerCommands();

if (config.token === undefined) {
    console.log("No token ! Add token:abcdef in the json !");
    return;
}