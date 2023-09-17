const { GatewayIntentBits, Client } = require('discord.js');
const config = require('./config.js');
const App = require('./app.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ],
});

a = new App(client);

if (config['discord_token'] === null) {
    console.log("No token ! Add 'discord_token': 'abcdef' in resources/config.json !");
    return;
}

a.registerCommands();

client.login(config['discord_token']);
