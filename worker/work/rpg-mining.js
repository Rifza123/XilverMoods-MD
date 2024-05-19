 const {
  addInventory,  checkInventory,
  getInventory,  addCoin,
  kurangCoin,    getCoin,
  addDarah,      kurangDarah,
  getDarah,      addBesi,
  kurangBesi,    getBesi,
  addEmas,       kurangEmas,
  getEmas,       addEmerald,
  kurangEmerald, getEmerald,
  addUmpan,      kurangUmpan,
  getUmpan,      addPotion,
  kurangPotion,  getPotion
 } = await r('../../lib/inventory.js')
 let { default:SET } = await r('../../validator/config.js');
const ms = await r('parse-ms')

const { sleep } = await r('../../lib/function.js')
export default {

	order: ['mining','menambang','nambang'],
	tags: 'RPG',
	command: ['mining'],
	maintenance: false,
	owner: false,
	co_owner: false,
	group: false,
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
    const isCekDarah = await getDarah(msg.sender)

if (isCekDarah < 1) return     msg.reply('Anda kelelahan! Cobalah heal menggunakan potion')
    if (!global.use.hasOwnProperty(msg.sender)) {
      global.use[msg.sender] = {};
    }
    if (!global.use[msg.sender].mining) {
      global.use[msg.sender].mining = { use: 0 }
    }
    if (global.use[msg.sender].mining.use > SET.rpg.mining.max) {   
      let t = ms(global.use[msg.sender].mining.time - new Date().getTime());
      msg.reply(`Kamu telah mencapat batas penggunaan mining\n\nKamu bisa mining lagi setelah: \n${t.days} hari; ${t.hours} jam; ${t.minutes} menit; ${t.seconds} detik;`)
      return;
    }
        let timewait = SET.rpg.mining.cd;
       global.use[msg.sender].mining.use = global.use[msg.sender].mining.use + 1;
    if(global.use[msg.sender].mining.use >= SET.rpg.mining.max){
      if(!global.use[msg.sender].mining.time){
                global.use[msg.sender].mining.time = new Date().getTime() + timewait;
                resetUse(timewait, msg.sender, "mining");
      }
      if(new Date().getTime() > global.use[msg.sender].mining.time){
                global.use[msg.sender].mining.time = new Date().getTime() + timewait;
                resetUse(timewait, msg.sender, "mining");
      }
    }

    const besi = [1, 2, 5, 0, 3, 0, 1, 1, 4, 1, 5, 0, 0]
    const emas = [0, 1, 2, 3, 0, 0, 0, 1, 1, 0, 0, 2]
    const emerald = [0, 0, 1, 0, 0, 1, 0, 2, 1, 0, 0, 1]

    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)]

    const besinya = getRandomItem(besi)
    const emasnya = getRandomItem(emas)
    const emeraldnya = getRandomItem(emerald)

    await msg.reply(`@${msg.sender.split("@")[0]} Mulai menambang🎣`)
    
let lukaMenambang = [
  "Terjatuh di dalam tambang gelap",
  "lukaMenambang oleh alat pertambangan",
  "Batuan jatuh menimpa",
  "Tersengat listrik saat menambang",
  "Terkunci di dalam tambang",
  "Kehabisan oksigen di dalam tambang",
  "lukaMenambang oleh pecahan kaca",
  "Ketiban bebatuan saat menambang",
  "Mengalami runtuhan tambang",
  "Tergelincir di lorong tambang",
  "Terjebak di bawah tumpukan batuan",
  "Terperangkap dalam lubang sempit",
  "Ketiban alat berat saat menambang",
  "Terjatuh dari ketinggian di dalam tambang",
  "Kehabisan makanan dan air di dalam tambang",
  "Mengalami keracunan gas tambang",
  "Terperosok ke dalam lubang tambang",
  "lukaMenambang oleh ledakan di dalam tambang",
  "Tersandung kabel listrik di dalam tambang",
  "lukaMenambang oleh bahan kimia tambang",
  "Terkurung di dalam tambang terbengkalai",
  "Terjebak dalam terowongan tambang yang runtuh",
  "Tersengat aliran air di dalam tambang",
  "lukaMenambang oleh alat bor tambang",
  "Terkunci di dalam ruang bawah tanah",
  "Mengalami kecelakaan kereta bawah tanah",
  "Tergantung di dalam terowongan tambang",
  "Terjatuh dari jembatan di dalam tambang",
  "Terkunci di dalam kabin lift tambang",
  "lukaMenambang oleh mesin penggali di dalam tambang",
];
   let darah = await getDarah(msg.sender)
   let luka = Math.floor(Math.random() * 20) + 1

if (darah > 20) {
  luka = Math.min(luka, 20);
} else if (darah > 10) {
  luka = Math.min(luka, 10);
} else if(darah < 10){
  luka = darah
}

    let lukanya = lukaMenambang[Math.floor(Math.random() * lukaMenambang.length)]
    
    const caption = `[ HASIL MENAMBANG ]\n*Besi* : ${besinya}\n*Emas* : ${emasnya}\n*Emerald* : ${emeraldnya}\n\n_Terluka: ${lukanya}, -${luka} darah_`

    const imageMessage = {
        text: caption,
        contextInfo: {
          externalAdReply: {
            thumbnailUrl: 'https://telegra.ph/file/393ac131253fd6420c696.jpg',
            mediaUrl: "http://ẉa.me/6283110928302/"+Math.floor(Math.random() * 100000000000000000),
            renderLargerThumbnail: true,
            showAdAttribution: true,
            mediaType: 1,
          },
        }
    }
    await sleep(3000)
    await Promise.all([
        client.sendMessage(from, imageMessage, { quoted: msg }),
        kurangDarah(msg.sender, luka),
        addBesi(msg.sender, besinya),
        addEmas(msg.sender, emasnya),
        addEmerald(msg.sender, emeraldnya),
    ])
	}
}
function r(_) { return import(_) }
