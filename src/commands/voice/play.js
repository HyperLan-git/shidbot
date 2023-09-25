const { getVoiceConnection, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { join } = require("node:path");

module.exports = {
    data: { name: "play", description: "Makes the bot play an sfx" },
    async execute(_, message) {
        if (message.content == '!play') {
            if (message.member.voice != null) {
                let chan = message.member.voice.channel;
                let conn = getVoiceConnection(chan.guild.id);
                if (conn === undefined) {
                    conn = joinVoiceChannel({
                        channelId: chan.id,
                        guildId: chan.guild.id,
                        adapterCreator: chan.guild.voiceAdapterCreator
                    });
                }
                let path = join(__dirname, "../../../resources/audio/metal-pipe.mp3");
                let res = createAudioResource(path);
                let player = createAudioPlayer();
                conn.subscribe(player);
                player.play(res);
            } else
                await message.reply("You must be in a voice channel !");
        }
    }
};