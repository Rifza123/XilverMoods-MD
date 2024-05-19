
export default {
	order: ['pinvid', 'pinterestvideo','pinterestvideosearch'],
	tags: 'search',
	command: ['pinterestvideo'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: false, //quotedImage: "pesannya"
	quotedAudio: false, //quotedAudio: "pesannya"
	premium: false, //true/false
	coin: false, //coin: "normal"
	quoted: "Example: .pinterestvideo <video yang ingin anda cari>", //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	await msg.reply("Searching pinterest video...")
	try{
	
	 let opts2 = {
                path: "/api/search/pinterest/video",
                params: {
                    query:q
                }
            };
            let url = query(api.rifza.url + opts2.path, opts2.params);
            let pint = await fetchJson(url);
     let xm_za = pint.pins[Math.floor(Math.random() * pint.pins.length)];     
     
            let opts = {
                path: "/api/pinterest/downloader",
                params: {
                    link: xm_za.link
                }
            };
            let _url = query(api.rifza.url + opts.path, opts.params);
            let tool = await fetchJson(_url);
     client.sendMessage(from, { video: { url:Object.values(tool.videos)[0].url}, mimetype: "video/mp4", caption: xm_za.title}, { quoted: msg })
     } catch (e){
        msg.reply("Type Err: "+e)
     }
	}
}
function r(_) { return import(_) }
