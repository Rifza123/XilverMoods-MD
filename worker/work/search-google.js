let { default:google } = await r('google-it')


export default {
	order: ['google'],
	tags: 'search',
	command: ['google'],
	quoted: "Mau cari apa??",
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
 let text = "[🔎] *GOOGLE SEARCH*\n\n" 
 google({'query': q})
 .then(async(a) => {
 for (let i = 0; i < a.length; i++) {
 text += `Result [${1 + i}]\n`
 text += `⇨*Title* : ${a[i].title}\n`
 text += `⇨ *Desc* : ${a[i].snippet}\n`
 text += `⇨ *Url* : ${a[i].link}\n\n`
 } 
 let message = {
 text: text,
 contextInfo: {
 externalAdReply: {
 title: "Query: " + q,
 body: "Results: " + a.length,
 thumbnailUrl: "https://telegra.ph/file/214e990113098505bb649.jpg",
 sourceUrl: a[0].url,
 mediaUrl: "http://ẉa.me/6283110928302?text=Idmsg: "+Math.floor(Math.random() * 100000000000000000),
 renderLargerThumbnail: true,
 showAdAttribution: true,
 mediaType: 1,
 },
 },
 };

 await client.sendMessage(from, message, {
 quoted: msg,
 }); 
 })
 
 
	}
}
function r(_) { return import(_) }
