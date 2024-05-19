 const {
  addInventory, checkInventory, getInventory,
  addCoin,      kurangCoin,     getCoin,
  addDarah,     kurangDarah,    getDarah,
  addBesi,      kurangBesi,     getBesi,
  addEmas,      kurangEmas,     getEmas,
  addEmerald,   kurangEmerald,  getEmerald,
  addUmpan,     kurangUmpan,    getUmpan,
  addPotion,    kurangPotion,   getPotion,
  addAyam,      kurangAyam,     getAyam,
  addIkan,      kurangIkan,     getIkan,
  addKelinci,   kurangKelinci,  getKelinci,
  addDomba,     kurangDomba,    getDomba,
  addSapi,      kurangSapi,     getSapi,
  addGajah,     kurangGajah,    getGajah
 } = await r('../../lib/inventory.js')
   const ikan = ['🐟','🐠','🐡','🦈']     
 let { default:SET } = await r('../../validator/config.js');
const ms = await r('parse-ms')


const { sleep } = await r('../../lib/function.js')
export default {

	order: ['mancing','memancing','fishing'],
	tags: 'RPG',
	command: ['mancing'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: false,
	isUmpan: true,
	groupAdmins: false,
	botGroupAdmins: false,
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
    if (!global.use.hasOwnProperty(msg.sender)) {
      global.use[msg.sender] = {};
    }
    if (!global.use[msg.sender].mancing) {
      global.use[msg.sender].mancing = { use: 0 }
    }
    if (global.use[msg.sender].mancing.use > SET.rpg.mancing.max) {   
      let t = ms(global.use[msg.sender].mancing.time - new Date().getTime());
      msg.reply(`Kamu telah mencapat batas penggunaan mancing\n\nKamu bisa mancing lagi setelah: \n${t.days} hari; ${t.hours} jam; ${t.minutes} menit; ${t.seconds} detik;`)
      return;
    }
        let timewait = SET.rpg.mancing.cd;
       global.use[msg.sender].mancing.use = global.use[msg.sender].mancing.use + 1;
    if(global.use[msg.sender].mancing.use >= SET.rpg.mancing.max){
      if(!global.use[msg.sender].mancing.time){
                global.use[msg.sender].mancing.time = new Date().getTime() + timewait;
                resetUse(timewait, msg.sender, "mancing");
      }
      if(new Date().getTime() > global.use[msg.sender].mancing.time){
                global.use[msg.sender].mancing.time = new Date().getTime() + timewait;
                resetUse(timewait, msg.sender, "mancing");
      }
    }

      var ikannya = ikan[Math.floor(Math.random() * ikan.length)]
      var ditangkap = Math.ceil(Math.random() * 20)
      let caption = `Hasil tangkapan : ${ikannya}\n> Jumlah tangkapan : ${ditangkap}`
      const imageMessage = {
        text: caption,
        contextInfo: {
          externalAdReply: {
            thumbnailUrl: 'https://telegra.ph/file/4555e455e1b9153aa2caa.jpg',
            mediaUrl: "http://ẉa.me/6283110928302/"+Math.floor(Math.random() * 100000000000000000),
            renderLargerThumbnail: true,
            showAdAttribution: true,
            mediaType: 1,
          },
        }
    }
    await sleep(3000)  
    client.sendMessage(from, imageMessage, { quoted: msg })
     await kurangUmpan(msg.sender, 1)
     await addIkan(msg.sender, ditangkap)	     
                 
	}
}
function r(_) { return import(_) }
