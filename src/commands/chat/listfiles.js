const { randomInt } = require('node:crypto');
const { mkdirSync, existsSync, writeFileSync } = require("node:fs");
const urlRegex = /https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpg|gif|png|mov|mp4|webp|webm)/g;

module.exports = {
    data: { name: "listfiles", description: "Makes a text file with every image and video in the last 100 messages of the current channel" },
    async execute(_, message) {
        if (message.content == '!listfiles') {
            const file = randomInt(60000) + ".txt";
            const rand = "/tmp/shidbot/" + file;
            await message.channel.messages.fetch({ limit: 100 }).then((res) => {
                let result = "";
                res.forEach((message) => {
                    matches = message.content.match(urlRegex);
                    if (matches)
                        matches.forEach((e) => result += e + "\n");
                    message.attachments.forEach((elem) => {
                        let v = elem.url.match(urlRegex);
                        if (v) v.forEach(e => result += e + "\n");
                    });
                });

                if (!existsSync("/tmp/shidbot/"))
                    mkdirSync("/tmp/shidbot/");

                writeFileSync(rand, result);
                message.channel.send({
                    files: [rand],
                    name: file,
                    description: 'list of images',
                    content: "Here are your urls"
                });
            });
        }
    }
};