const ytdl = require('ytdl-core');
const { mkdirSync, existsSync, createWriteStream, statSync } = require("node:fs");
const { randomInt } = require('node:crypto');

const filelimit = 24; // 25Mb

module.exports = {
    data: { name: "vid", description: "Downloads a youtube video so that you can steal it hehehe (will glitch out at the end for long videos)" },
    async execute(_, message) {
        if (message.content == '!vid') message.reply('Add a video\'s URL !');
        if (message.content.startsWith("!vid ")) {
            const url = message.content.split(" ")[1];
            const file = randomInt(60000) + ".mp4";
            const rand = "/tmp/shidbot/" + file;

            if (!existsSync("/tmp/shidbot/"))
                mkdirSync("/tmp/shidbot/");

            if (!ytdl.validateURL(url)) {
                await message.reply("Invalid video url !");
                return;
            }
            let { res, info } = await ytdl.getInfo(url).then((info) => {
                let res = null;
                for (let format in info.formats) {
                    let f = info.formats[format];
                    if (!f.hasAudio || !f.hasVideo || f.width > 800) continue;
                    if (!res || res.width < f.width)
                        res = f;
                }
                return { res: res, info: info };
            });
            if (res === null) {
                await message.reply("Video too big !");
                return;
            }
            ytdl.downloadFromInfo(info, { format: res, range: { end: filelimit * 1024 * 1024 } }).pipe(createWriteStream(rand)).on('close', async () => {
                message.channel.send({
                    files: [rand],
                    name: file,
                    description: 'Downloaded video',
                    content: "Here's your video"
                });
            });
        }
    }
};