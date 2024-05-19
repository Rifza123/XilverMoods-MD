const { default:SETTING } = await r('../../validator/config.js')

export default {
	order: ['gemini','bard'],
	tags: 'ai',
	command: [ 'bard','gemini'],
	quoted: 'Silahkan tanyakan sesuatu, contoh: .bard kamu bisa berak ga?',
	coin: false,
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
	     const { key } = await client.sendMessage(from, {text: '```Sedang mencari jawaban...🔍```'}, { quoted: msg });      	    
    try{
	 let opts = {
                path: "/api/ai/bard",
                params: {
                    query: encodeURIComponent(q),
                    key: api.rifza.key
                }
            };         
            let url = query(api.rifza.url + opts.path, opts.params);
            let tool = await fetchJson(url);
            if(!tool.status) return msg.reply(tool?.msg ? tool.msg : "Error!")
            client.sendMessage(from, { edit: key, text: "```[ BARD - GEMINI ]```\n\n"+ tool.chatUi })
    } catch(e) {
     msg.reply(`Type-Err! :\n${e}`) 
    }
 
	}
}
function r(_) { return import(_) }
