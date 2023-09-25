const { randomInt } = require('node:crypto');
const { join } = require("node:path");
const { readdirSync } = require("node:fs");
const randElem = arr => arr.at(randomInt(arr.length));

module.exports = {
    data: { name: "neco", description: "Posts a random neco-arc picture" },
    async execute(_, message) {
        if (message.content == '!neco') {
            const path = join(__dirname, "../../../resources/NECOS/");
            const commandFolders = readdirSync(path);
            const elem = randElem(commandFolders);
            const res = join(path, elem);
            await message.channel.send({
                files: [res],
                name: elem,
                description: 'Neco-arc picture',
                content: "Here's your image"
            });
        }
    }
};