
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

 	order: ['buy','beli'],
 	tags: 'RPG',
 	command: ['buy'],
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
 	 let isCoin = await getCoin(msg.sender)
 	 if (args[0] === 'potion' || args[0] === 'umpan') {
 let multiplier;
 let itemName;
 if (args[0] === 'potion') {
 multiplier = 3000;
 itemName = 'Potion';
 } else if (args[0] === 'umpan') {
 multiplier = 370;
 itemName = 'Umpan';
 } 

 let quantity = parseInt(args[1]);
 if (!quantity || isNaN(quantity)) {
 return msg.reply(`Harus berupa angka! Contoh: ${order} ${args[0]} 15`);
 }

 let totalCost = multiplier * quantity;
 if (isCoin < totalCost) {
 return msg.reply(`Sisa Coin anda tidak mencukupi untuk pembelian ini\nCoin yang dibutuhkan: ${totalCost}\nCoin anda: ${getCoin(msg.sender)}`);
 }

 if (args[1].includes('-') || args[1].includes('+') || args[1].includes('/') || args[1].includes('*')) {
 return msg.reply('Format salah!');
 }

 kurangCoin(msg.sender, totalCost);
 var apalu = quantity * 1;

 if (args[0] === 'potion') {
 addPotion(msg.sender, apalu);
 setTimeout(() => {
 msg.reply(`Transaksi berhasil ✔️\n*Sisa Coin anda*: ${getCoin(msg.sender)}\n*Potion anda*: ${getPotion(msg.sender)}`);
 }, 2000);
 } else if (args[0] === 'umpan') {
 addUmpan(msg.sender, apalu);
 setTimeout(() => {
 msg.reply(`Transaksi berhasil ✔️\n*Sisa Coin anda*: ${getCoin(msg.sender)}\n*Umpan anda*: ${getUmpan(msg.sender)}`);
 }, 2000);
 } 
} else {
 msg.reply(`*▪︎ LIST HARGA*
 
 - *potion* [ Harga: 3000 coin ]
 - *umpan* [ Harga: 370 coin ]
 
 
_ Example: .buy potion 1_
`
);
}

 }
 }
 function r(_) { return import(_) }
