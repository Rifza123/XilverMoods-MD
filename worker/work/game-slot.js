const { default:SETTING } = await r('../../validator/config.js')
const ms = await r('parse-ms')

const {
	addInventory,
	checkInventory,
	addCoin,
	kurangCoin,
	getCoin
} = await r('../../lib/inventory.js')

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
//rumus bet÷25×poin
let item = [
 {
 3: 40,
 4: 80,
 5: 120,
 "symb": "🍀️"
 },
 {
 3: 40,
 4: 80,
 5: 160,
 "symb": "🍊"
 },
 {
 3: 40,
 4: 80,
 5: 160,
 "symb": "🍒"
 },
 {
 3: 40,
 4: 80,
 5: 160,
 "symb": "🍋"
 },
 {
 3: 40,
 4: 80,
 5: 160,
 "symb": "🔟"
 },
 {
 3: 40,
 4: 80,
 5: 160,
 "symb": "🍺"
 },
 {
 3: 50,
 4: 90,
 5: 300,
 "symb": "🔟"
 },
 {
 3: 72,
 4: 104,
 5: 520,
 "symb": "🦋"
 },
 {
 3: 26,
 4: 42,
 5: 94,
 "symb": "🍌"
 }]

function checkwin(results, bet) {
 let first1 = results[0][0]["symb"]
 let first2 = results[0][1]["symb"]
 let first3 = results[0][2]["symb"]
 let hasil = 0
 let status
 
 if (results[1][0]["symb"] == first1 || results[1][1]["symb"] == first1 || results[1][2]["symb"] == first1) {
 if (results[2][0]["symb"] == first1 || results[2][1]["symb"] == first1 || results[2][2]["symb"] == first1) {
 if (results[3][0]["symb"] == first1 || results[3][1]["symb"] == first1 || results[3][2]["symb"] == first1) {
 if (results[4][0]["symb"] == first1 || results[4][1]["symb"] == first1 || results[4][2]["symb"] == first1) {
 let all = [...results[0][0]["symb"],...results[0][1]["symb"],...results[1][2]["symb"],...results[1][0]["symb"],...results[1][1]["symb"],...results[1][2]["symb"],...results[2][0]["symb"],...results[2][1]["symb"],...results[2][2]["symb"],...results[3][0]["symb"],...results[3][1]["symb"],...results[3][2]["symb"],...results[4][0]["symb"],...results[4][1]["symb"],...results[4][2]["symb"]]
 let counts = {}
 all.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
 let pointitem = item.find(x => x["symb"] == first1)
 let multipli = counts[first1] >= 5 ? pointitem[5] : counts[first1] == 4 ? pointitem[4] : pointitem[3]
 hasil += bet/25*Number(multipli)
 } else {
 let all = [...results[0][0]["symb"],...results[0][1]["symb"],...results[1][2]["symb"],...results[1][0]["symb"],...results[1][1]["symb"],...results[1][2]["symb"],...results[2][0]["symb"],...results[2][1]["symb"],...results[2][2]["symb"],...results[3][0]["symb"],...results[3][1]["symb"],...results[3][2]["symb"]]
 let counts = {}
 all.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
 let pointitem = item.find(x => x["symb"] == first1)
 let multipli = counts[first1] >= 5 ? pointitem[5] : counts[first1] == 4 ? pointitem[4] : pointitem[3]
 hasil += bet/25*Number(multipli)
 }
 } else {
 let all = [...results[0][0]["symb"],...results[0][1]["symb"],...results[1][2]["symb"],...results[1][0]["symb"],...results[1][1]["symb"],...results[1][2]["symb"],...results[2][0]["symb"],...results[2][1]["symb"],...results[2][2]["symb"]]
 let counts = {}
 all.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
 let pointitem = item.find(x => x["symb"] == first1)
 let multipli = counts[first1] >= 5 ? pointitem[5] : counts[first1] == 4 ? pointitem[4] : pointitem[3]
 hasil += bet/25*Number(multipli)
 }
 }
 }
 if (results[1][0]["symb"] == first2 || results[1][1]["symb"] == first2 || results[1][2]["symb"] == first2) {
 if (results[2][0]["symb"] == first2 || results[2][1]["symb"] == first2 || results[2][2]["symb"] == first2) {
 if (results[3][0]["symb"] == first2 || results[3][1]["symb"] == first2 || results[3][2]["symb"] == first2) {
 if (results[4][0]["symb"] == first2 || results[4][1]["symb"] == first2 || results[4][2]["symb"] == first2) {
 let all = [...results[0][0]["symb"],...results[0][1]["symb"],...results[1][2]["symb"],...results[1][0]["symb"],...results[1][1]["symb"],...results[1][2]["symb"],...results[2][0]["symb"],...results[2][1]["symb"],...results[2][2]["symb"],...results[3][0]["symb"],...results[3][1]["symb"],...results[3][2]["symb"],...results[4][0]["symb"],...results[4][1]["symb"],...results[4][2]["symb"]]
 let counts = {}
 all.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
 let pointitem = item.find(x => x["symb"] == first2)
 let multipli = counts[first1] >= 5 ? pointitem[5] : counts[first2] == 4 ? pointitem[4] : pointitem[3]
 hasil += bet/25*Number(multipli)
 } else {
 let all = [...results[0][0]["symb"],...results[0][1]["symb"],...results[1][2]["symb"],...results[1][0]["symb"],...results[1][1]["symb"],...results[1][2]["symb"],...results[2][0]["symb"],...results[2][1]["symb"],...results[2][2]["symb"],...results[3][0]["symb"],...results[3][1]["symb"],...results[3][2]["symb"]]
 let counts = {}
 all.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
 let pointitem = item.find(x => x["symb"] == first2)
 let multipli = counts[first1] >= 5 ? pointitem[5] : counts[first2] == 4 ? pointitem[4] : pointitem[3]
 hasil += bet/25*Number(multipli)
 }
 } else {
 let all = [...results[0][0]["symb"],...results[0][1]["symb"],...results[1][2]["symb"],...results[1][0]["symb"],...results[1][1]["symb"],...results[1][2]["symb"],...results[2][0]["symb"],...results[2][1]["symb"],...results[2][2]["symb"]]
 let counts = {}
 all.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
 let pointitem = item.find(x => x["symb"] == first2)
 let multipli = counts[first1] >= 5 ? pointitem[5] : counts[first2] == 4 ? pointitem[4] : pointitem[3]
 hasil += bet/25*Number(multipli)
 }
 }
 }
 if (results[1][0]["symb"] == first3 || results[1][1]["symb"] == first3 || results[1][2]["symb"] == first3) {
 if (results[2][0]["symb"] == first3 || results[2][1]["symb"] == first3 || results[2][2]["symb"] == first3) {
 if (results[3][0]["symb"] == first3 || results[3][1]["symb"] == first3 || results[3][2]["symb"] == first3) {
 if (results[4][0]["symb"] == first3 || results[4][1]["symb"] == first3 || results[4][2]["symb"] == first3) {
 let all = [...results[0][0]["symb"],...results[0][1]["symb"],...results[1][2]["symb"],...results[1][0]["symb"],...results[1][1]["symb"],...results[1][2]["symb"],...results[2][0]["symb"],...results[2][1]["symb"],...results[2][2]["symb"],...results[3][0]["symb"],...results[3][1]["symb"],...results[3][2]["symb"],...results[4][0]["symb"],...results[4][1]["symb"],...results[4][2]["symb"]]
 let counts = {}
 all.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
 let pointitem = item.find(x => x["symb"] == first3)
 let multipli = counts[first1] >= 5 ? pointitem[5] : counts[first3] == 4 ? pointitem[4] : pointitem[3]
 hasil += bet/25*Number(multipli)
 } else {
 let all = [...results[0][0]["symb"],...results[0][1]["symb"],...results[1][2]["symb"],...results[1][0]["symb"],...results[1][1]["symb"],...results[1][2]["symb"],...results[2][0]["symb"],...results[2][1]["symb"],...results[2][2]["symb"],...results[3][0]["symb"],...results[3][1]["symb"],...results[3][2]["symb"]]
 let counts = {}
 all.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
 let pointitem = item.find(x => x["symb"] == first3)
 let multipli = counts[first1] >= 5 ? pointitem[5] : counts[first3] == 4 ? pointitem[4] : pointitem[3]
 hasil += bet/25*Number(multipli)
 }
 } else {
 let all = [...results[0][0]["symb"],...results[0][1]["symb"],...results[1][2]["symb"],...results[1][0]["symb"],...results[1][1]["symb"],...results[1][2]["symb"],...results[2][0]["symb"],...results[2][1]["symb"],...results[2][2]["symb"]]
 let counts = {}
 all.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
 let pointitem = item.find(x => x["symb"] == first3)
 let multipli = counts[first1] >= 5 ? pointitem[5] : counts[first3] == 4 ? pointitem[4] : pointitem[3]
 hasil += bet/25*Number(multipli)
 }
 }
 }
 if (hasil == 0) {
 status = "LOSE"
 } else {
 if (hasil > bet*4) {
 status = "BIG WIN"
 } else if (hasil > bet*6) {
 status = "MEGA WIN"
 } else if (hasil > bet*8) {
 status = "SUPER WIN"
 } else {
 status = "WIN"
 }
 }
 //console.log(status)
 return {hasil: hasil, status: status}
}

//pola kemenangan

function spintslot() {
 let result = []
 for (let col = 0; col < 5; col++) {
 let column = []
 for (let coll = 0; coll < 3; coll++) {
 let randomitem = Math.floor(Math.random() * item.length)
 //console.log(randomitem)
 column.push(item[randomitem])
 }
 result.push(column)
 }
 return(result)
}

export default {

	order: ['slot'],
	tags: 'game',
	command: ['slot'],
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
	quoted: 'Contoh : .slot 200', //quoted: "pesannya"
	quotedSticker: false, //quotedSticker: "pesannya"
	quotedStickerVideo: false, //quotedStickerVideo: "pesannya"
	quotedUrl: false, // quotedUrl: { url: 'instagram.com', reply: 'Gunakan link instagram!' },
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {

  if(!global.use.hasOwnProperty(msg.sender)){	 	
	  global.use[msg.sender] = {}
	}
   if(!global.use[msg.sender]?.slot){
    global.use[msg.sender].slot = { use: 1}
   }
	if(global.use[msg.sender].slot.use > 13){ 
	 if(!global.use[msg.sender]?.slot?.time){
	 let timewait = 3600000	
        global.use[msg.sender].slot.time = new Date().getTime() + timewait	 
        global.resetUse(timewait, msg.sender, "slot")	   	     
	
    	 }
	   let t = ms(global.use[msg.sender].slot.time - new Date().getTime() )
    	 msg.reply(`*JANGAN SERING MAIN SLOT!!*\nKamu telah mencapat batas penggunaan slot\n\nKamu bisa memainkan slot lagi setelah: \n${t.days} hari; ${t.hours} jam; ${t.minutes} menit; ${t.seconds} detik;`)
      return
	 }		
   if (isNaN(q) || !isFinite(q)) { return msg.reply('Harus berupa angka!') }
   if (!checkInventory(msg.sender)) { await addInventory(msg.sender) }
      global.use[msg.sender].slot.use = global.use[msg.sender].slot.use +1

	let senderCoin = await getCoin(msg.sender)
	if(parseInt(q) < 50) return msg.reply("Coin minimum adalah 50!")
 if(senderCoin < parseInt(q)) return msg.reply(`Coin kamu tidak cukup!\nKamu hanya memiliki 🪙${senderCoin} coin\nJumlah koin yang kurang : ${senderCoin - parseInt(q)}`)

	let text = `👑GAME SLOT 👑`
		await kurangCoin(msg.sender, parseInt(q)) 
	 let proces = await client.sendMessage(from, {
			text: text + `Memulai game slot, -${q} 🪙coin`
		}, {
			quoted: msg
		})
		
		


let los = 0
let win = 0
//let spinn = 1000

//for (let i = 0; i < spinn; i++) {
let g = spintslot()

async function displaySymbols(symbols) {
 let result = ""
 await new Promise((resolve) => {
 for (let row = 0; row < 3; row++) {
 let rowSymbols = ""
 for (let col = 0; col < 5; col++) {
 const symbolObject = symbols[col][row]
 const symbol = symbolObject.symb
 rowSymbols += `${symbol}|`
 }
 result += `"${rowSymbols.slice(0, -1)}"\n`
 }
 resolve()
 });
 
 return result;
}



 let h = await checkwin(g,parseInt(q))
 let display = await displaySymbols(g)
// console.log(g)
 if (h.status == "LOSE") {
 los++
 } else {
 await addCoin(msg.sender, parseInt(h.hasil))
 win++
 }
//}
let mes;
if(win > los) {
 mes = `*${h.status}!!!!!!🥳🎊🎉*`
} else if(los > win) {
 mes = "*You lose :(*"
}

mes += `\nResult : \n\n${display}`
mes += `\n\n----------------------------------`
mes += `\n🪙Spinned coins : ${parseInt(q)}`
mes += `\n🪙Coin Result Spin : ${h.hasil}`
mes += `\nYour current coin : ${await getCoin(msg.sender)}`
mes += `\n\n_slot game by @affis_`
msg.reply(mes)
	}
}
function r(_) { return import(_) }
