const { mediafireDl } = await r("../engine/mediafire.js")
const { default: SETTING } = await r('../../validator/config.js');
const modul = SETTING['modul'];
const axios = modul['axios']
const { sleep } = await r('../../lib/function.js');

export default {
	order: ['mediafire','mediafireDl'],
	tags: 'downloader',
	command: ['mediafire'],
	quoted: 'Harap sertakan url mediafirenya!',
	coin: 'medium',
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: false,
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
	await sleep(1000)
	     const { key } = await client.sendMessage(from, {text: '```Processing..```'}, { quoted: msg });      	    
    	try{
           let m = await mediafireDl(q)
           	 await client.sendMessage(from, { text: "Checking media type...", edit: key})
           let { headers } = await axios.get(m.link)
           let type = headers["content-type"]
           	 await client.sendMessage(from, { text: "Sending...", edit: key})
           await client.sendMessage(from, { document: { url: m.link }, mimetype: type, fileName: m.title}, { quoted: msg })
           	 await client.sendMessage(from, { text: "Success", edit: key })

    	} catch (e) {
    	  	 await client.sendMessage(from, { text: "TypeErr: "+e, edit: key})
    	}	

	}
}
function r(_) { return import(_) }

