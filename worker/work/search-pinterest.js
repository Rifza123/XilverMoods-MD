const { pinterest } = await r('../engine/pinterest.js')
export default {

	order: ['pin','pint','pinterest','pinimg'],
	tags: 'ai',
	command: ['pinterest'],
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
	quoted: "Example: .pinterest <gambar yang ingin anda cari>", //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	 const pint = await pinterest(`${q}`)
 let xm_za = pint[Math.floor(Math.random() * pint.length)];
 client.sendMessage(from, { image: { url: xm_za } }, { quoted: msg })
	}
}
function r(_) { return import(_) }
