const { default:SETTING } = await r('../../validator/config.js')
const modul = SETTING['modul']
const fs = modul['fs']

const { sleep } = await r('../../lib/function.js')

let tebakkata = JSON.parse(fs.readFileSync('./lib/container/tebakkata.json'))

export default {
	order: ['tebakkata'],
	tags: 'game',
	command: ['tebakkata'],
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

         if (global.game.includes(from)) return msg.reply(`*Masih ada permainan yang sedang berlangsung!*\nJika keluhan ini masih ada tetapi game sudah lumayan lama tidak dimainkan, cobalah ketik *${prefix + 'dellgame'}*`)
         await addGame(from)
            let upah = 1500
            let waktu = 60000
            let date = new Date().getTime()
            let data = tebakkata[Math.floor(Math.random() * tebakkata.length)];
            let jawaban = data.jawaban
             console.log(data)
            global._tebakkata[from.split('@')[0]] = { date: date, user: from, jawaban: jawaban.toLowerCase(), time: waktu, coin: upah }  
             fs.writeFileSync("./lib/container/database/tebakkata.json", JSON.stringify(global._tebakkata, null, 2))
            client.sendMessage(from, { text: '*[ TEBAK KATA ]*\n*Pertanyaan :* ' + data.soal.toString() + `\n*Hadiah :* ${upah} coin` + `\n*Waktu :* ${waktu}s\n\n_ketik *nyerah* jika anda tidak sanggup_\n\n*Reply pesan bot dengan mengetik _hint untuk bantuan\n*Jawab dengan mereply pesan bot ini!*`}, { quoted: msg })
            await sleep(global._tebakkata[from.split('@')[0]].time)      
            let isGame = global._tebakkata.hasOwnProperty(from.split('@')[0])   
            
            if (isGame && _tebakkata[from.split("@")[0]].date == date) {
              client.sendMessage(from, { text: 'WAKTU HABIS!\n*Jawaban :* ' + jawaban, mentions: [msg.sender] },{ quoted : msg }) 
              delete global._tebakkata[from.split('@')[0]]
              fs.writeFileSync("./lib/container/database/tebakkata.json", JSON.stringify(global._tebakkata, null, 2)) 
             deleteGame(from)
            }
           
	}
}
 function r(_){return import(_)}