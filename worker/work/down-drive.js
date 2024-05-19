const { default: SETTING } = await r('../../validator/config.js');
const modul = SETTING['modul'];
const axios = modul['axios']
const { sleep } = await r('../../lib/function.js');

export default {
	order: ['drive','drivedl'],
	tags: 'downloader',
	command: ['drive'],
	quoted: 'Harap sertakan url google-drivenya!',
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
    	   //simple for get file from drive by rifza
    	   let id = q.split("/file/d/")[1].split("/")[0]
    	   let url = "https://drive.usercontent.google.com/uc?id="+id+"&export=download"
           let { headers } = await axios.get(url)
           	 await client.sendMessage(from, { text: "Checking media type...", edit: key})
           let type = headers["content-type"]
           let name = headers["content-disposition"].split('filename="')[1].split('"')[0]
           console.log(name)
           	 await client.sendMessage(from, { text: "Sending...", edit: key})
           await client.sendMessage(from, { document: { url: url }, mimetype: type, fileName: name}, { quoted: msg })
           	 await client.sendMessage(from, { text: "Success", edit: key })
    	} catch (e) {
    	  	 await client.sendMessage(from, { text: "TypeErr: "+e, edit: key})
    	}	

	}
}
function r(_) { return import(_) }

