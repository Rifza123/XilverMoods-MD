const { tiksave } = await r("../engine/tiktokdl.js")

export default {
	order: ['tiktok','tt','tiktokdl','tiktokslide','tiktoknowm','tiktokvid','ttdl'],
	tags: 'downloader',
	command: ['tiktok'],
	maintenance: false,
	coin: "tiktok",
	quoted: 'linknya?',
	quotedUrl: {
		url: 'tiktok',
		reply: 'Gunakan link tiktok!'
	},
	quotedSticker: false,
	quotedStickerVideo: false,	
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	quotedImage: false,
	quotedAudio: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	var q =  "http"+ q.split("http")[1].split(" ")[0]
   try{
	let data = await tiksave(q)
	let type = data.type
    if(type == 'image'){     
     let images = data.media   	            
     for (let N = 0; N < images.length; N++) {
        await client.sendMessage(from, { image: { url: images[N].url }, caption: 'images: ' + (N + 1)}, { quoted: msg })
     }
    }
    if(type == 'video'){
     let video = data.media[2]
     client.sendMessage(from, { video: { url: video.url } }, { quoted: msg })
    } 
   } catch (e){ 
   console.error(e)
     msg.reply("Error!, Mungkin link tidak valid")
	}
  }
}
function r(_) { return import(_) }
