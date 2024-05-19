const { default:SETTING } = await r('../../validator/config.js');

export default {

	order: ['getpp'],
	tags: 'baileys',
	command: ['getpp'],
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
	quotedUrl: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	 let mention = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0 ? msg.message.extendedTextMessage.contextInfo.mentionedJid 
 : msg.message.extendedTextMessage?.contextInfo?.participant ? [msg.message.extendedTextMessage.contextInfo.participant] 
 : null
 if (q){
 let number = msg.quoted ? msg.quoted.sender : q.replace(/[^0-9]/g, '')+SETTING['chats'][0]
 let profile = await client.profilePictureUrl(number, 'image')
 client.sendMessage(from, { image: { url: profile } }, { quoted: msg }).catch(o => msg.reply("Type Err:" + o) )
 } else if(mention){
 let number = mention
 let profile = await client.profilePictureUrl(number, 'image')
 client.sendMessage(from, { image: { url: profile } }, { quoted: msg }).catch(o => msg.reply("Type Err:" + o) )
 } else {
 let reply = `*Sertakan nomor target atau reply/tag target yang akan di ambil profilenya*\n
Example: 

*Cara #1* = _Dengan menyertakan nomor target_
 - ${order} +62 856-9211-44697
 
*Cara #2* => _Dengan reply pesan target_
 - ${order} 
 
*Cara #3* => _Dengan tag target_
 - ${order} @exports.rifza` 
 msg.reply(reply)
 }
	}
}
function r(_) { return import(_) }
