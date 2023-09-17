module.exports = {
    data: { name: "ping", description: "Makes the bot answer with 'Pong!'" },
    async execute(_, message) {
        if (message.content == '!ping')
            await message.reply('Pong!');
    },
};