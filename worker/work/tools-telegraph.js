const { TelegraPh } = await r('../engine/telegraph.js')
const fs = await r("fs")

export default {

    order: ['tourl','telegraph'],
	maintenance: false,
	owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: "Reply imagenya!",  //quotedImage: "pesannya"
	quotedAudio: false,  //quotedAudio: "pesannya"	
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
	let media = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')
        let tph = await TelegraPh(media)
        fs.unlinkSync(media)
          await msg.reply(tph)
	}
}
function r(_) { return import(_) }
