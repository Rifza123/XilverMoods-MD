export default {
	tags: 'search',
	command: ['googleimage'],
	order: ['googleimage', 'image'],
	maintenance: false,
	owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedAudio: false, //quotedAudio: "pesannya"	
	quoted: "Mau cari apa?\nex: #googleimage jokowi", //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
		try {

			let opts = {
				path: "/api/search/google-image",
				params: {
					query: q,
					key: api.rifza.key
				}
			};
			let _url = query(api.rifza.url + opts.path, opts.params);
			client.sendMessage(from, {
				image: {
					url: _url
				}
			}, {
				quoted: msg
			})
		} catch (e) {
			msg.reply("!Type error:\n" + e)
		}
	}
}

function r(_) {
	return import(_)
}