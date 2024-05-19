
export default {
	order: ['tomp3','toaudio'],
	tags: 'tools',
	command: [ 'tomp3' ],
	quoted: false,
	quotedUrl: false,
	quotedVideo: "Reply videonya!",
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
      let buffer = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')            
               client.sendMessage(from, { audio: {url : buffer}, mimetype: 'audio/mp4'}, {quoted: msg})       
	}
}