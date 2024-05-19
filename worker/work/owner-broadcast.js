export default {

	order: ['broadcast', 'bc'],
	tags: 'owner',
	command: [ 'broadcast'],
	coin: false,
	quotedSticker: false,
	quotedStickerVideo: false,
	quoted: "teks?",
	quotedUrl: false,
	owner: true,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix,
		store
	}) => {
 let { default:SET } = await r('../../validator/config.js');
let { sleep } = await r('../../lib/function.js');
let source = SET['ig']
    	try{
    	 let message = {
                text: "*[ BROADCAST ]*\n\n" + q,                             
         };
              if(msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage){
                let getImgMsg = msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;// ○ Create by @rifza.p.p
            	let media = await client.downloadMediaMessage(getImgMsg, 'image');
                message.contextInfo = {
                  externalAdReply: {
                    title: `${msg.sayingtime + msg.timoji}`,
                    body: `TopCMD ⇨ '${prefix + client.cmdS()[0][1]['name']}', use: '${client.cmdS()[0][1]['use']}', times: '${client.cmdS()[0][1]['times']}'`,
                    thumbnail: media,
                    sourceUrl: source,
                    mediaUrl: "http://ẉa.me/6283110928302?text=Idmsg: "+Math.floor(Math.random() * 100000000000000000),
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    mediaType: 1,
                  }
                }
              }
              let au = await store.chats.all().map(v => v.id)
	        	for (let bcs of au) {
	        	 try{
		          await sleep(2000)
		          await client.sendMessage(bcs, message, {
                    quoted: msg.fkontak(),
                  });
                 } catch (e) { await msg.reply("TypeErr: "+e) }	
          		}
              msg.reply(`Berhasil mengirim broadcast ke ${au.length} chats`)

              
              
    	} catch (e) {
    	
    	  msg.reply("TypeErr: "+e)
    	}	

	}
}


function r(_) { return import(_) }

