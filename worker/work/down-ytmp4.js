const axios = await r("axios")
const { youtubeDownload, youtubeSearch } = await r("../engine/youtube.js")

export default {
	order: ['ytdl','youtubedl','youtubemp4','playvideo', 'ytmp4'],
	tags: 'downloader',
	command: [ 'ytmp4', 'playvideo' ],
	quoted: 'Harap sertakan url/judul videonya!',
	coin: 'ytmp4',
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
 	try{
 	 let search = await youtubeSearch(q)
 	 let { items } = search.data 
 	 let item = items[0]
 	 let n = "\n"
 	 let text = "```[ YOUTUBE AUDIO PLAY ]```" + n
 	 text += " ▪︎ *ID*: " + item.id + n
 	 text += " ▪︎ *Url*: " + item.url + n
 	 text += " ▪︎ *Title*: " + item.title + n
 	 text += " ▪︎ *PublishedAt*: " + item.publishedAt + n
 	 text += " ▪︎ *Description*: " + item.description + n
 	 text += " ▪︎ *Duration*: " + item.duration + n
 	 text += " ▪︎ *Views*: " + item.viewCount + n
 	 text += " ▪︎ *Creator/Channel*: " + item.creator
 	 let message = {
 text: text,
 contextInfo: {
 externalAdReply: {
 title: "Title: " + item.title,
 body: "Channel: " + item.creator,
 thumbnailUrl: item.thumbnail,
 sourceUrl: item.url,
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
 
 let download = await youtubeDownload("mp4", item.id)
 if(download.status == false) return msg.reply("Error!, Please try again")
 let mssg = {
 video: { url: download.url },
 contextInfo: {
 externalAdReply: {
 title: "Title: " + item.title,
 body: "Channel: " + item.creator,
 thumbnailUrl: item.thumbnail,
 sourceUrl: item.url,
 mediaUrl: "http://ẉa.me/6283110928302?text=Idmsg: "+Math.floor(Math.random() * 100000000000000000),
 renderLargerThumbnail: false,
 showAdAttribution: true,
 mediaType: 2,
 },
 },
 };
 
 await client.sendMessage(from, mssg, {
 quoted: msg,
 });
 	} catch (e) {
 	 msg.reply("TypeErr: "+e)
 	}	

	}
}
function r(_) { return import(_) }
