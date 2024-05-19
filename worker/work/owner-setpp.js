const { default:SETTING } = await r('../../validator/config.js')
let success = SETTING['message'][7]

export default {

	order: ['setpp','setppbot'],
	tags: 'owner',
	command: ['setpp'],
	maintenance: false,
	coin: false,
	quoted: false,
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: false,
	owner: true,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	quotedImage: "Reply imagenya!",
	quotedAudio: false,
	premium: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	let botNumber = client.user.id.split(':')[0] + SETTING['chats'][0]
  	   client.sendMessage(from, { react: { text: "⏱️", key: msg.key }})
          let buffer = await client.downloadMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')     
             let { bufferzzz } = await client.generateProfilePicture(buffer)
               await client.query({ tag: 'iq', 
                 attrs: { to: botNumber, type:'set', xmlns: 'w:profile:picture' },
                 content: [
                   { 
                     tag: 'picture', 
                     attrs: { 
                       type: 'image' 
                     }, 
                     content: bufferzzz 
                   }
                 ]
               })
        msg.reply(success)	
	}
}
function r(_) { return import(_) }
