const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: { name: "leave" },
    async execute(_, message) {
        if (message.content == '!leave') {
            if (message.member.voice != null) {
                let chan = message.member.voice.channel;
                let conn = getVoiceConnection(chan.guild.id);
                if (conn === undefined) {
                    await message.reply("Bot must be in a voice channel !");
                    return;
                }
                conn.disconnect();
            } else
                await message.reply("You must be in a voice channel !");
        }
    }
};