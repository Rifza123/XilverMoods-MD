export default {

	order: ['opentime','closetime'],
	tags: 'group',
	command: ['opentime','closetime'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: true,
	groupAdmins: true,
	botGroupAdmins: true,
	quotedVideo: false, //quotedVideo: "pesannya"
	quotedImage: false,  //quotedImage: "pesannya"
	quotedAudio: false,  //quotedAudio: "pesannya"
	premium: false,  //true/false
	coin: false, //coin: "normal"
	quoted: false, //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
	let xfkontak = { key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { "contactMessage":{"displayName": `XM-Multi`,"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:2;;;;\nFN:\nitem1.TEL;waid=00000:00000\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}}
	let set = {}
	if(order.slice(1) == "closetime"){ 
	  set.type = "announcement"
	  set.text = "ditutup"
	  set.fulltext = `*Tepat waktu!*\nGroup ditutup oleh admin @${msg.sender.split("@")[0]}\n_sekarang semua peserta tidak dapat mengirim pesan_`
	} else if(order.slice(1) == "opentime"){
	  set.type = "not_announcement"
	  set.text = "dibuka"
	  set.fulltext = `*Tepat waktu!*\nGroup dibuka oleh admin @${msg.sender.split("@")[0]}\n_sekarang semua peserta dapat mengirim pesan_`
	}
     if(isNaN(args[0])) return msg.reply(`*List:*\ndetik\nmenit\njam\n\n*contoh*\n${order}10 detik`)  
       let timer;
       if (args[1]=="detik") {
          timer = parseInt(args[0]) * 1000
		} else if (args[1]=="menit") {
		  timer = parseInt(args[0]) * 60000
		} else if (args[1]=="jam") {
		  timer = parseInt(args[0]) * 3600000
		} else {
	      return msg.reply(`*List:*\ndetik\nmenit\njam\n\n*contoh*\n${order}10 detik`)  
		}
		await msg.reply(`AKSES WAKTU DIPROSES\nGrup akan ${set.text} dalam ${q} lagi`)    
		setTimeout(async() => {	
		  await client.groupSettingUpdate(from, set.type)
		  client.sendMessage(from, {text: set.fulltext, mentions:[msg.sender]},{quoted:xfkontak})
		}, timer)
	}
}