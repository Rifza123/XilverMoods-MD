const { default:SETTING } = await r('../../validator/config.js')
const axios = SETTING.modul['axios']

export default {
	order: ['geminipro','geminiimg','geminiimage','geminivision'],
	tags: 'ai',
	command: [ 'geminiimg','geminiprovision'],
	quoted: 'Silahkan tanyakan sesuatu, contoh: .geminivision jelaskan ini gambr apa?',
	coin: false,
	quotedImage: "Reply gambar dan tanyakan sesuatu!",
	quotedSticker: false,
	quotedStickerVideo: false,
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
		let img = await Buffer.from(await client.downloadMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image')).toString("base64")
   const { key } = await client.sendMessage(from, {text: '```Sedang mengidentifikasi...🔍```'}, { quoted: msg });      	    
    try{
     let y = await(await axios.post("https://rifza.me/api/ai/gemini-pro-vision", { query: q, image: img, key: api.rifza.key })).data
      if(!y.status) return msg.reply(y.msg)
      client.sendMessage(from, { edit: key, text: "```[ GEMINI - VISION ]```\n\n" + y.response })
     } catch(e) {
       console.error(e)
      msg.reply(`Type-Err! :\n${e}`) }
 
	}
}

function r(_) { return import(_) }
