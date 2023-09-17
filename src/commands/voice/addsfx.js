const { createWriteStream } = require('fs');
const { join } = require('path');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

module.exports = {
    data: { name: "addsfx", description: "Adds an sfx to the list (please provide a valid audio file)" },
    async execute(_, message) {
        if (message.content == '!addsfx') {
            if (message.attachments.size == 0) {
                await message.reply("Missing file !");
                return;
            }
            const a = message.attachments.first();

            const stream = createWriteStream(join(__dirname, "../../../resources/audio/" + a.name));
            const { body } = await fetch(a.url);
            await finished(Readable.fromWeb(body).pipe(stream)).then(message.reply("Done !"));
        }
    }
};