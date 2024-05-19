
 const {
 	addInventory,
 	checkInventory,
 	getInventory,
 	addCoin,
 	kurangCoin,
 	getCoin,
 	addDarah,
 	kurangDarah,
 	getDarah,
 	addBesi,
 	kurangBesi,
 	getBesi,
 	addEmas,
 	kurangEmas,
 	getEmas,
 	addEmerald,
 	kurangEmerald,
 	getEmerald,
 	addUmpan,
 	kurangUmpan,
 	getUmpan,
 	addPotion,
 	kurangPotion,
 	getPotion
 } = await r('../../lib/inventory.js')

 export default {

 	order: ['heal'],
 	tags: 'RPG',
 	command: ['heal'],
 	maintenance: false,
 	owner: false,
 	co_owner: false,
 	group: false,
 	groupAdmins: false,
 	botGroupAdmins: false,
 	quotedVideo: false, //quotedVideo: "pesannya"
 	quotedImage: false, //quotedImage: "pesannya"
 	quotedAudio: false, //quotedAudio: "pesannya"
 	premium: false, //true/false
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
 	  let isCekDarah = await getDarah(msg.sender)
 	  let isPotion = await getPotion(msg.sender)
 	  if (!isCekDarah < 1) return msg.reply('anda hanya bisa heal ketika darah anda 0')
         if (isCekDarah > 100) return msg.reply('Darah anda sudah penuh')
         if (isPotion < 1) return msg.reply('anda tidak punya potion, cobalah beli dengan cara #buy potion _jumlah_') 
          await addDarah(msg.sender, 100)
           kurangPotion(msg.sender, 1)
           msg.reply('Berhasil, darah anda sekarang: ' + await getDarah(msg.sender) + "\nSisa potion anda: " + await getPotion(msg.sender))

  }
 }
 function r(_) { return import(_) }

 
 
