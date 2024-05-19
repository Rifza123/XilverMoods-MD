export default {

	order: ['delete','del','hapus'],
	tags: 'baileys',
	command: ['delete'],
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
	quoted: false, //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	 if (!msg.quoted) return msg.reply('Reply pesanya!')
 if (!msg.quoted.isBaileys) return msg.reply('Fitur ini hanya berlaku menghapus pesan bot yang di kirim oleh saya!') 
 client.sendMessage(from, { delete: { remoteJid: from, fromMe: true, id: msg.quoted.id, participant: msg.quoted.sender } })
	}
}