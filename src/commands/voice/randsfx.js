const { getVoiceConnection, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { randomInt } = require('node:crypto');
const { join } = require("node:path");
const { readdirSync } = require("node:fs");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const maxTime = 1000 * 60 * 60;
const randElem = arr => arr.at(randomInt(arr.length));

module.exports = {
    data: { name: "randsfx" },
    async execute(_, message) {
        if (message.content == '!randsfx') {
            if (message.member.voice != null) {
                let chan = message.member.voice.channel;
                let conn = getVoiceConnection(chan.guild.id);
                if (conn === undefined) {
                    await message.reply("Bot must be in your voice channel !");
                    return;
                }
                const path = join(__dirname, "../../../resources/audio/");
                const commandFolders = readdirSync(path);
                let res = createAudioResource(join(path, randElem(commandFolders)));
                let player = createAudioPlayer();
                conn.subscribe(player);
                player.play(res);
                let w8 = 0;
                while (w8 < maxTime) {
                    let res2 = createAudioResource(join(path, randElem(commandFolders)));
                    let del = randomInt(100) * 100;
                    w8 += del;
                    await delay(del);
                    player.play(res2);
                }
            } else
                await message.reply("You must be in a voice channel !");
        }
    }
};