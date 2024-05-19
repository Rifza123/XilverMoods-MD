export default {
    order: ['capcut'],
    tags: 'downloader',
    command: ['capcut'],
    quoted: 'Harap sertakan url capcut nya!!',
    coin: 'normal',
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
                path: "/api/capcut",
                params: {
                    url: encodeURIComponent(q),
                    apikey: api.neoxr.key
                }
            };
            let url = query(api.neoxr.url + opts.path, opts.params);
            let res = await fetchJson(url);
            if (!res.status) return msg.reply(res.msg);
            await client.sendMessage(from, { video: { url: res.data.url }, caption: res.caption }, { quoted: msg })
        } catch (e) {
        console.log(e)
            msg.reply("Error!, mungkin link tidak valid!");
        }
    }
};
