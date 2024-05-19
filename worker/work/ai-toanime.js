const {
	default: SETTING
} = await r('../../validator/config.js')
const {
	TelegraPh
} = await r('../engine/telegraph.js')
const fs = await r("fs")

export default {
	order: ['toanime'],
	tags: 'art',
	command: ['toanime'],
	coin: "high",
	quotedSticker: false,
	quotedStickerVideo: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	quotedImage: "Reply imagenya!!",
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
		let tryng = 0
		try {
			let media = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
			let tph = await TelegraPh(media)
			fs.unlinkSync(media)
			let ai = await fetchJson(api.rifza.url + "/api/ai/filters?action=anime2d&link=" + tph + "&key=" + api.rifza.key)
			if (!ai.status) return msg.reply(ai.msg ? ai.msg : "Error!")
			while (tryng < 50) {
				let s = await fetchJson(api.rifza.url + "/api/ai/filters/batchProgress?id=" + ai.id)
				if (s.status == 3) {
					return client.sendMessage(from, {
						image: {
							url: api.rifza.url + "/api/tools/buffimg?link=" + s.url
						}
					}, {
						quoted: msg
					})
				}
				if (s.status == 4) {
					return msg.reply("Maaf terjadi kesalhan. coba gunakan gambar lain!")
				}
				await new Promise(resolve => setTimeout(resolve, 2000));
			}
		} catch (e) {
			console.error(e)
			msg.reply(`Type-Err! :\n${e}`)
		}
	}
}

function r(_) {
	return import(_)
}