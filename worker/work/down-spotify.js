export default {
    order: ['spotify','spotifyplaylist'],
    tags: 'downloader',
    command: ['spotify', 'spotifyplaylist'],
    quoted: 'Harap sertakan url nya!!',
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
                path: "/api/spotify",
                params: {
                    url: encodeURIComponent(q),
                    apikey: api.neoxr.key
                }
            };
            let type = q.includes("track") ? 1
            : 2
            let url = query(api.neoxr.url + opts.path, opts.params);
            let res = await fetchJson(url);
            if (!res.status) return msg.reply(res.msg);
            if(type == 1){
            let audio = {
                audio: { url: res.data.url },
                mimetype: "audio/mpeg",
                fileName: res.data.title + ".m4a",
                contextInfo: {
                  externalAdReply: {
                    title: "Artist: " + res.data.artist.name,
                    body: "dration: " + res.data.duration,
                    thumbnailUrl: res.data.thumbnail,
                    sourceUrl: res.data.thumbnail,
                    mediaUrl: "http://ẉa.me/628311092830?text=Idmsg: "+Math.floor(Math.random() * 100000000000000000),
                    renderLargerThumbnail: false,
                    showAdAttribution: true,
                    mediaType: 2,
                  },
                },
              };
              
              await client.sendMessage(from, audio, {
                quoted: msg,
             });
            } 
            if(type==2){
                let lts = "```[ PLAY - LIST ]```\n";
            let sections = [];
            
                let list = {
                    title: `${res.data.title}`,
                    rows: [                        
                    ]
                };
            for (let i = 0; i < res.tracks.length; i++) {
                list.rows.push({ title: `${res.tracks[i].artists} ▪︎ ${res.tracks[i].title}`, rowId: `${prefix}spotify ${res.tracks[i].url}` })
            }
            sections.push(list);
            const listMessage = {
                text: `LIST RESULT`,
                footer: "©rifza.p.p",
                title: `Silahkan pilih untuk me download!`,
                buttonText: "Open here",
                sections
            };
            await client.sendMessage(from, listMessage, { quoted: msg });
            }
            
        } catch (e) {
        console.log(e)
            msg.reply("Error!, mungkin link tidak valid!");
        }
    }
};
