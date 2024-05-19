const { default:SETTING } = await r('../../validator/config.js')
const modul = SETTING['modul']
const fs = modul['fs']

const { sleep } = await r('../../lib/function.js')

let tebakgambar = JSON.parse(fs.readFileSync('./lib/container/tebakgambar.json'))

export default {
	order: ['tebakgambar'],
	tags: 'game',
	command: ['tebakgambar'],
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
    const deleteGame = async (ID) => {
          global.game.splice(ID, 1)
           fs.writeFileSync("./lib/container/database/game.json", JSON.stringify(global.game, null, 2))
    }
    const addGame = async (ID) => {
          global.game.push(ID)
           fs.writeFileSync("./lib/container/database/game.json", JSON.stringify(global.game, null, 2))
    }
    
         if (global.game.includes(from)) return msg.reply(`*Masih ada permainan yang sedang berlangsung!*\nJika keluhan ini masih ada tetapi game sudah lumayan lama tidak dimainkan, cobalah ketik *${prefix + 'dellgame'}*`)
	if(!global.use.hasOwnProperty(msg.sender)){	 	
	  global.use[msg.sender] = {}
	}
   if(!global.use[msg.sender]?.game){
    global.use[msg.sender].game = { use: 1}
   }
	if(global.use[msg.sender].game.use > 10){ 
	 if(!global.use[msg.sender]?.game?.time){
	    let timewait = 1800000
        global.use[msg.sender].game.time = new Date().getTime() + timewait	 
        resetUse(timewait, msg.sender, "game")	   	     
	 }
	   let t = ms(global.use[msg.sender].game.time - new Date().getTime() )
    	 msg.reply(`Kamu telah mencapat batas penggunaan game\n\nKamu bisa memainkan game lagi setelah: \n${t.days} hari; ${t.hours} jam; ${t.minutes} menit; ${t.seconds} detik;`)
      return
	 }
	       global.use[msg.sender].game.use = global.use[msg.sender].game.use +1

         await addGame(from)
            let upah = 2000
            let waktu = 60000
            let date = new Date().getTime()
            let data = tebakgambar[Math.floor(Math.random() * tebakgambar.length)];
            let jawaban = data["jawaban"]
             console.log(data)
            global._tebakgambar[from.split('@')[0]] = { date: date, user: from, jawaban: jawaban.toLowerCase(), time: waktu, coin: upah }  
            client.sendMessage(from, { image: { url: data["img"] }, caption: `*[ TEBAK GAMBAR ]*\n\n*Deskripsi :* ${data["deskripsi"]}\n*Hadiah :* ${upah} coin` + `\n*Waktu :* ${waktu}s\n\n_ketik *nyerah* jika anda tidak sanggup_\n\n*Reply pesan bot dengan mengetik _hint untuk bantuan\n*Jawab dengan mereply pesan bot ini!*`}, { quoted: msg })
            await sleep(global._tebakgambar[from.split('@')[0]].time)            
            if (global.game.includes(from) && _tebakgambar[from.split("@")[0]].date == date) {
              client.sendMessage(from, { text: 'WAKTU HABIS!\n*Jawaban :* ' + jawaban, mentions: [msg.sender] },{ quoted : msg }) 
              delete global._tebakgambar[from.split('@')[0]]
             deleteGame(from)
            }
           
	}
}
 function r(_){return import(_)}
