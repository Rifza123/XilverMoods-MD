export default {
    order: ['ssweb', 'ss'],   
	tags: 'tools',
	command: ['ssweb'],
    coin: 'ssweb',
	quoted: 'Harap sertakan link!',
    quotedUrl: { url: 'http', reply: 'Gunakan url dengan menyertakan "http://" atau "https://" !' },
    owner: false,
    co_owner: false,
    group: false,
    groupAdmins: false,
    botGroupAdmins: false,
    exec: async (msg, client, from, { q, args, order }) => {    
    client.sendMessage(from, { react: { text: "⏱️", key: msg.key }})
    client.sendMessage(from, { image: { url : 'https://image.thum.io/get/width/1900/crop/1000/fullpage/' + q }, caption: `Result✔️`}, { quoted: msg } )
  }
}