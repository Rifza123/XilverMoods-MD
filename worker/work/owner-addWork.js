const fs = await r("fs")
const { default:SETTING } = await r('../../validator/config.js')
let success = SETTING['message'][7]

export default {
	order: ['addwork'],
	tags: 'owner',
	command: ['addwork'],
	maintenance: false,
	owner: true,
	co_owner: true,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: false,  //quotedImage: "pesannya"
	quotedAudio: false,  //quotedAudio: "pesannya"
	premium: false,  //true/false
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
     	let text1 = q.split("$=>")[0]
        let text2 = q.split("$=>")[1]
          if (!text1) return msg.reply("Contoh! : " + order + ' ' + 'tes.js $=> isi filenya')    
          if (!text1) return msg.reply("Contoh! : " + order + ' ' + 'tes.js $=> isi filenya')
      await fs.writeFileSync("./worker/work/" + text1, text2)
      setTimeout(async()=> { await fs.writeFileSync("./worker/work/" + text1, text2) }, 1000)
      msg.reply(success)
	}
}

function r(_) { return import(_) }
