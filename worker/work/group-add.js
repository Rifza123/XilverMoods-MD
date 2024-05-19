const { default:SETTING } = await r('../../validator/config.js')

export default {

	order: ['add'],
	tags: 'group',
	command: ['add'],
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
 
 if (args[1]){
 let number = msg.quoted ? msg.quoted.sender : q.replace(/[^0-9]/g, '')+SETTING['chats'][0]
 let response = await client.groupParticipantsUpdate(from, [number], "add")
 let o = await response[0]
 let inv = o.status 
 let invv = await client.groupInviteCode(from) 
 if(inv == 408) return msg.reply('Dia baru-baru saja keluar dari grub ini!')
 if(inv == 409) return msg.reply('Dia sudah join!')
 if(inv == 500) return msg.reply('Grub penuh!')
 if(inv == 403){
 client.sendMessage(from, { text: `@${number.split('@')[0]} tidak dapat ditambahkan karena target private *acc*\nUndangan akan dikirimkan ke -> wa.me/${q.replace(/[^0-9]/g, '')} Melalui jalur pribadi`, mentions: [number] }, { quoted : msg }) 
 setTimeout(()=>{client.sendMessage(`${number}`, { text: `${'https://chat.whatsapp.com/' + invv}\n------------------------------------------------------\n\nAdmin:\nwa.me/${msg.sender}\n Mengundang anda ke group ini\nSilahkan masuk🙇`, mentions: [number] }, { quoted : msg })},500)
 }
 console.log(inv)
 } else if(mention){
 let response = await client.groupParticipantsUpdate(from, [mention[0]], "add")
 let o = await response[0]
 let inv = o.status
 let invv = await client.groupInviteCode(from) 
 console.log(inv)
 console.log(mention)
 if(inv == 408) return msg.reply('Dia baru-baru saja keluar dari grub ini!')
 if(inv == 409) return msg.reply('Dia sudah join!')
 if(inv == 500) return msg.reply('Grub penuh!')
 if(inv == 403){
 client.sendMessage(from, { text: `${mention[0]} tidak dapat ditambahkan karena target private *acc*\nUndangan akan dikirimkan ke -> wa.me/${mention[0]} Melalui jalur pribadi`, mentions: mention }, { quoted : msg }) 
 setTimeout(()=>{ client.sendMessage(`${mention[0]}`, { text: `${'https://chat.whatsapp.com/' + invv}\n------------------------------------------------------\n\nAdmin:\nwa.me/${msg.sender}\n Mengundang anda ke group ini\nSilahkan masuk🙇`, mentions: mention }, { quoted : msg }) },500)
 }
 console.log(inv)
 } else {
 let reply = `*Sertakan nomor target atau reply/tag target yang telah keluar dari group!*\n
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
