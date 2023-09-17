const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    data: { name: "join", description: "Makes the bot join your current voice channel" },
    async execute(_, message) {
        if (message.content == '!join') {
            if (message.member.voice != null) {
                let chan = message.member.voice.channel;
                joinVoiceChannel({
                    channelId: chan.id,
                    guildId: chan.guild.id,
                    adapterCreator: chan.guild.voiceAdapterCreator
                });
            } else
                await message.reply("You must be in a voice channel !");
        }
    }
};