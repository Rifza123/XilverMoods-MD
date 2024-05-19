const { default:SETTING } = await r('../../validator/config.js')
const modul = SETTING['modul']
let {
	downloadContentFromMessage
} = modul['baileys']

let {
	writeExifVid,
	writeExifImg
} = await r('../engine/exif.js')


export default {

	order: ['s', 'sticker', 'setiker'],
	tags: 'maker',
	command: ['sticker'],	
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix,
		isMedia
	}) => {
		if ((isMedia && !msg.message.videoMessage || msg.isQuotedImage || msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.imageMessage) && args.length == 0) {
			client.sendMessage(from, {
				react: {
					text: "⏱️",
					key: msg.key
				}
			})
			var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo?.quotedMessage.imageMessage || msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.imageMessage, 'image')
			var buffer = Buffer.from([])
			for await (const chunk of stream) {
				buffer = Buffer.concat([buffer, chunk])
			}
			let buffers = await writeExifImg(buffer, {
				packname: 'My sticker',
				author: 'Ⓒ' + msg.pushName
			})
			await client.sendMessage(from, {
				sticker: {
					url: buffers
				}
			}, {
				quoted: msg
			})
		} else if ((isMedia && !msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.videoMessage?.seconds < 11 || msg.message?.videoMessage?.seconds < 11 || msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.seconds < 11) && args.length == 0) {
			client.sendMessage(from, {
				react: {
					text: "⏱️",
					key: msg.key
				}
			}) 
			var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message?.videoMessage || msg.message.extendedTextMessage?.contextInfo?.quotedMessage.videoMessage, 'video')
			var buffer = Buffer.from([])
			for await (const chunk of stream) {
				buffer = Buffer.concat([buffer, chunk])
			}
			let buffers = await writeExifVid(buffer, {
				packname: 'My sticker',
				author: 'Ⓒ' + msg.pushName
			})
			await client.sendMessage(from, {
				sticker: {
					url: buffers
				}
			}, {
				quoted: msg
			})
		} else {
			msg.reply(`Reply gambar/video/sticker dengan caption ${prefix + 'sticker'} \n*(MAKSIMAL 10 DETIK!)*`)
		}

	}
}
function r(_) { return import(_) }
