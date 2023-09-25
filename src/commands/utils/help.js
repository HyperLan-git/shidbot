module.exports = {
    data: { name: "help", description: "Gives helpful information about commands" },
    async execute(app, message) {
        if (message.content == '!help') {
            let msg = "Here's the list of commands you can use : \n";
            app.commands.forEach((cmd) => {
                msg += cmd.data.name + ": " + cmd.data.description + "\n";
            });
            await message.channel.send(msg);
        }
    }
};