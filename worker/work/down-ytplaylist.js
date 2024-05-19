export default {
    order: ['ytplaylist'],
    tags: 'downloader',
    command: ['ytplaylist'],
    quoted: 'Harap sertakan url youtube playlist nya!!',
    coin: 'medium',
    quotedSticker: false,
    quotedStickerVideo: false,
    quotedUrl: false,
    owner: false,
    co_owner: false,
    group: false,
    groupAdmins: false,
    botGroupAdmins: false,
    quotedVideo: false,
    exec: async (msg, client, from, {
        q,
        args,
        order,
        prefix
    }) => {
        try {
            let opts = {
                path: "/api/yt-playlist",
                params: {
                    url: encodeURIComponent(q),
                    apikey: api.neoxr.key
                }
            };
            let url = query(api.neoxr.url + opts.path, opts.params);
            console.log(url)
            let res = await fetchJson(url);
            if (!res.status) return msg.reply(res.msg);
            let lts = "```[ PLAY - LIST ]```\n";
            let sections = [];
            for (let i = 0; i < res.data.length; i++) {
                let list = {
                    title: `[${i + 1}] ▪︎${res.data[i].title}`,
                    rows: [
                        { title: "AUDIO/M4A", rowId: `${prefix}ytm4a ${res.data[i].url}` },
                        { title: "VIDEO/MP4", rowId: `${prefix}playvideo ${res.data[i].url}` }
                    ]
                };
                sections.push(list);
            }
            const listMessage = {
                text: `LIST RESULT`,
                footer: "©rifza.p.p",
                title: `Silahkan pilih untuk me download!`,
                buttonText: "Open here",
                sections
            };
            await client.sendMessage(from, listMessage, { quoted: msg });
        } catch (e) {
        console.log(e)
            msg.reply("Error!, mungkin link tidak valid!");
        }
    }
};
