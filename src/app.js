const ping = (_, message) => {
    if (message.content == 'ping')
        message.channel.send("pong");
};

class App {
    client;
    commands = [ping];

    constructor(client) {
        this.client = client;
        console.log(client);
    }

    addCommand(command) {
        this.commands.push(command);
    }

    registerCommands() {
        this.client.on("message", (message) => {
            this.commands.forEach((v) => v(this, message));
        });
    }

    unregisterCommands() {
    }
}

module.exports = App