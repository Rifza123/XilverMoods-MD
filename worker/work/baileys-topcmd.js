export default {
	order: ['topcmd'],
	tags: 'baileys',
	command: ['topcmd'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: false, //quotedImage: "pesannya"
	premium: false, //true/false
	coin: false, //coin: "normal"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
    	let a = client.topCmd(200)
    	let i = 0;
	    msg.reply("```[ TOP LIST CMD ]```\n\n"+ a.map(b => {i += 1; return `[${i}] ${b}`}).join("\n"))
	}
}
