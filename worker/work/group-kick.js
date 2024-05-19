const { default:SETTING } = await r('../../validator/config.js')

export default {

	order: ['kick'],
	tags: 'group',
	command: ['kick'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: true,
	groupAdmins: true,
	botGroupAdmins: true,
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
	let mention = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0 ? msg.message.extendedTextMessage.contextInfo.mentionedJid 
 : msg.message.extendedTextMessage?.contextInfo?.participant ? [msg.message.extendedTextMessage.contextInfo.participant] 
 : null
 
 if(mention){
 const botNumber = client.user.id.split(':')[0] + SETTING['chats'][0]
 if(mention.includes(botNumber)) return msg.reply("Saya tidak ingin keluar!")
 client.groupParticipantsUpdate(from, mention, "remove")
 } else {
 let reply = `*Reply/tag target yang akan dikeluaran dari group!*\n
Example: 

*Cara #1* => _Dengan reply pesan target_
 - ${order} 
 
*Cara #2* => _Dengan tag target_
 - ${order} @exports.rifza` 
 
 msg.reply(reply)
 }
 
	}
}
function r(_) { return import(_) }
