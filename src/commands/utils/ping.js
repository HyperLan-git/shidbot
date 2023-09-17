module.exports = {
    data: { name: "ping" },
    async execute(_, message) {
        if (message.content == 'ping')
            await message.reply('Pong!');
    },
};