const { createWriteStream, rmSync, existsSync } = require('fs');
const { join } = require('path');
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const ffmpeg = require("ffmpeg");

module.exports = {
    data: { name: "vidcorrupt", description: "Corrupts a video by amplifying the audio by 40db, destroying the color balance and lowering the bitrate to 500bps" },
    async execute(_, message) {
        if (message.content == '!vidcorrupt') {
            if (message.attachments.size == 0) {
                await message.reply("Missing file !");
                return;
            }
            const a = message.attachments.first();
            const fp = join("/tmp/shidbot/", "2_" + a.name);
            if (existsSync(fp))
                rmSync(fp);

            const p = join("/tmp/shidbot/", a.name);
            const stream = createWriteStream(p);
            const { body } = await fetch(a.url);
            await finished(Readable.fromWeb(body).pipe(stream)).then(async () => {
                await new ffmpeg(p, async (err, v) => {
                    if (err) console.log(err);
                    v.addCommand('-y');
                    v.addCommand('-b:v', '50k');
                    v.addCommand('-filter_complex',
                        "\"alimiter=level_in=64:level_out=64:attack=0.1:level=false,volume=10000;" +
                        "gblur=sigma=10,noise=alls=30:allf=t+u," +
                        "geq=r='mod(r(X,Y)*1.5+50, 256)':g='mod(g(X,Y)*1.8+100, 256)':b='mod(b(X,Y)*3+100, 256)'," +
                        "noise=alls=50\"");
                    await v.save(fp).then((res) => {
                        message.channel.send({
                            files: [res],
                            name: a.name,
                            description: 'Messed up video',
                            content: "Here's your video"
                        })
                    }, (err) => console.log(err));
                });
            });
        }
    }
};