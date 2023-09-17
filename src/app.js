const { Collection, Events } = require('discord.js');
const fs = require('node:fs')
const path = require('node:path');

class App {
    client;
    commands = new Collection();

    messageListener = null;

    constructor(client) {
        this.client = client;

        const foldersPath = path.join(__dirname, 'commands');
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    this.addCommand(command);
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }

        this.client.once(Events.ClientReady, () => {
            console.log('Ready!');
        });
    }

    addCommand(command) {
        this.commands.set(command.data.name, command);
    }

    removeCommand(command) {
        let idx = this.commands.indexOf(command);
        if (idx != -1) this.commands.splice(idx, 1);
    }

    registerCommands() {
        this.messageListener = async (message) => {
            this.commands.forEach((cmd) => cmd.execute(this, message));
        };
        this.client.on(Events.MessageCreate, this.messageListener);
    }

    unregisterCommands() {
        this.client.off(Events.MessageCreate, this.messageListener);
    }
}

module.exports = App;