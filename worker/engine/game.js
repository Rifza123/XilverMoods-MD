const fs = await r("fs")
const { default:SETTING } = await r('../../validator/config.js')
const {
   exec
} = await r("child_process")
const {
	addInventory,
	checkInventory,
	addCoin,
	kurangCoin,
	getCoin,
	addExp
} = await r('../../lib/inventory.js');
const {
	sleep   
} = await r('../../lib/function.js')


//path
const imgf = "./lib/container/image/"
const font = "./worker/engine/BPdotsUnicaseBold.ttf"
//response
const salah = "Jawaban Salah!"

 export const gameMachine = async(client, chatmessage, msg, from, isCmd) =>{
    const botNumber = client.user.id.split(':')[0] + SETTING['chats'][0]
    let usrcoin = getCoin(msg.sender)
    const deleteGame = async (ID)=> {
          global.game.splice(ID, 1)
    }
    const win = async (h, c, exp)=> {
      await msg.reply(`Selamat jawaban kamu benar🥳🎉\n\n[🎁]Kamu mendapatkan hadiah sebanyak 🪙${h} coin dan 🔹️${exp} exp`)
    }
    //--------------------[ TEBAK KATA ]--------------------\\
     if (!msg.isBaileys && global.game.includes(from) && global._tebakkata.hasOwnProperty(from.split('@')[0]) && chatmessage && !isCmd && !msg.key.fromMe) {
     let jawaban = global._tebakkata[from.split('@')[0]].jawaban  
         if(!global._tebakkata[from.split('@')[0]]?.hint){
            global._tebakkata[from.split('@')[0]].hint = 0
         }
         if(chatmessage == "_hint"){
          if(usrcoin < 1000) return msg.reply(`🪙Coin kamu tidak mencukupi untuk melakukan tindakan ini!\n -Coin diperlukan: 1000\n -Coin yang kurang: ${usrcoin - 1000}\n -Dimiliki: ${usrcoin}`)
          if(!global._tebakkata[from.split('@')[0]].hint == 0) return msg.reply("Bantuan sudah kamu gunakan!")
             global._tebakkata[from.split('@')[0]].hint = 1
             kurangCoin(msg.sender, 1000)
             msg.reply(`-🪙1000 Coin`)
             msg.reply("Hint: " + jawaban.replace(/[aiueo]/g, "_"))
             return
         }
        if (chatmessage.toLowerCase().includes(jawaban)) {  
        let _exp = Math.floor(Math.random() * (2000 - 500 + 1)) + 500
        addExp(msg.sender, _exp) 
       addCoin(msg.sender, global._tebakkata[from.split('@')[0]].coin)
        await win(global._tebakkata[from.split('@')[0]].coin, getCoin(msg.sender), _exp)
          delete global._tebakkata[from.split('@')[0]]
         deleteGame(from)
        } else if(chatmessage == 'nyerah'){
          client.sendMessage(from, { text: 'Anda menyerah, game dibatalkan!\n*Jawaban :* ' + jawaban, mentions: [msg.sender] },{ quoted : msg }) 
          delete global._tebakkata[from.split('@')[0]]
           deleteGame(from)
        } else {
        msg.reply(salah)
       }
     }
     
    //--------------------[ TEBAK GAMBAR ]--------------------\\
     if (!msg.isBaileys && global.game.includes(from) && global._tebakgambar.hasOwnProperty(from.split('@')[0]) && !isCmd && chatmessage && !msg.key.fromMe) {
     let jawaban = global._tebakgambar[from.split('@')[0]].jawaban
     if(!global._tebakgambar[from.split('@')[0]]?.hint){
            global._tebakgambar[from.split('@')[0]].hint = 0
         }
         if(chatmessage == "_hint"){
          if(usrcoin < 1000) return msg.reply(`🪙Coin kamu tidak mencukupi untuk melakukan tindakan ini!\n -Coin diperlukan: 1000\n -Coin yang kurang: ${usrcoin - 1000}\n -Dimiliki: ${usrcoin}`)         
          if(!global._tebakgambar[from.split('@')[0]].hint == 0) return msg.reply("Bantuan sudah kamu gunakan!")
             kurangCoin(msg.sender, 1000)
             msg.reply(`-🪙1000 Coin`)
             global._tebakgambar[from.split('@')[0]].hint = 1
             msg.reply("Hint: " + jawaban.replace(/[aiueo]/g, "_"))
             return
         }     
        if (chatmessage.toLowerCase().includes(jawaban)) { 
        let _exp = Math.floor(Math.random() * (2000 - 500 + 1)) + 500
        addExp(msg.sender, _exp) 
       addCoin(msg.sender, global._tebakgambar[from.split('@')[0]].coin)
        await win(global._tebakgambar[from.split('@')[0]].coin, getCoin(msg.sender), _exp)
          delete global._tebakgambar[from.split('@')[0]]
         deleteGame(from)
        } else if(chatmessage == 'nyerah'){
          client.sendMessage(from, { text: 'Anda menyerah, game dibatalkan!\n*Jawaban :* ' + jawaban, mentions: [msg.sender] },{ quoted : msg }) 
          delete global._tebakgambar[from.split('@')[0]]
           deleteGame(from)
        } else {
        msg.reply(salah)
       }
     }              

    //--------------------[ SIAPAKAHAKU ]--------------------\\
     if (!msg.isBaileys && global.game.includes(from) && global._siapakahaku.hasOwnProperty(from.split('@')[0]) && chatmessage && !isCmd && !msg.key.fromMe) {
     let jawaban = global._siapakahaku[from.split('@')[0]].jawaban      
     if(!global._siapakahaku[from.split('@')[0]]?.hint){
            global._siapakahaku[from.split('@')[0]].hint = 0
         }
         if(chatmessage == "_hint"){
          if(usrcoin < 1000) return msg.reply(`🪙Coin kamu tidak mencukupi untuk melakukan tindakan ini!\n -Coin diperlukan: 1000\n -Coin yang kurang: ${usrcoin - 1000}\n -Dimiliki: ${usrcoin}`)         
          if(!global._siapakahaku[from.split('@')[0]].hint == 0) return msg.reply("Bantuan sudah kamu gunakan!")
             kurangCoin(msg.sender, 1000)
             msg.reply(`-🪙1000 Coin`)
             global._siapakahaku[from.split('@')[0]].hint = 1
             msg.reply("Hint: " + jawaban.replace(/[aiueo]/g, "_"))
             return
         }     
        if (chatmessage.toLowerCase().includes(jawaban)) {  
        let _exp = Math.floor(Math.random() * (2000 - 500 + 1)) + 500
        addExp(msg.sender, _exp) 
       addCoin(msg.sender, global._siapakahaku[from.split('@')[0]].coin)
        await win(global._siapakahaku[from.split('@')[0]].coin, getCoin(msg.sender), _exp)
          delete global._siapakahaku[from.split('@')[0]]
           deleteGame(from)
        } else if(chatmessage == 'nyerah'){
          client.sendMessage(from, { text: 'Anda menyerah, game dibatalkan!\n*Jawaban :* ' + jawaban, mentions: [msg.sender] },{ quoted : msg }) 
          delete global._siapakahaku[from.split('@')[0]]
           deleteGame(from)
        } else {
        msg.reply(salah)
       }
     }

  //--------------------[ TEBAK BENDERA ]--------------------\\
     if (!msg.isBaileys && global.game.includes(from) && global._tebakbendera.hasOwnProperty(from.split('@')[0]) && chatmessage && !isCmd && !msg.key.fromMe) {
     let jawaban = global._tebakbendera[from.split('@')[0]].jawaban      
     if(!global._tebakbendera[from.split('@')[0]]?.hint){
            global._tebakbendera[from.split('@')[0]].hint = 0
         }
         if(chatmessage == "_hint"){
          if(usrcoin < 1000) return msg.reply(`🪙Coin kamu tidak mencukupi untuk melakukan tindakan ini!\n -Coin diperlukan: 1000\n -Coin yang kurang: ${usrcoin - 1000}\n -Dimiliki: ${usrcoin}`)         
          if(!global._tebakbendera[from.split('@')[0]].hint == 0) return msg.reply("Bantuan sudah kamu gunakan!")
             kurangCoin(msg.sender, 1000)
             msg.reply(`-🪙1000 Coin`)             
             global._tebakbendera[from.split('@')[0]].hint = 1
             msg.reply("Hint: " + jawaban.replace(/[aiueo]/g, "_"))
             return
         }     
        if (chatmessage.toLowerCase().includes(jawaban)) {  
        let _exp = Math.floor(Math.random() * (2000 - 500 + 1)) + 500
        addExp(msg.sender, _exp) 
       addCoin(msg.sender, global._tebakbendera[from.split('@')[0]].coin)
        await win(global._tebakbendera[from.split('@')[0]].coin, getCoin(msg.sender), _exp)
          delete global._tebakbendera[from.split('@')[0]]
           deleteGame(from)
        } else if(chatmessage == 'nyerah'){
          client.sendMessage(from, { text: 'Anda menyerah, game dibatalkan!\n*Jawaban :* ' + jawaban, mentions: [msg.sender] },{ quoted : msg }) 
          delete global._tebakbendera[from.split('@')[0]]
           deleteGame(from)
        } else {
        msg.reply(salah)
       }
     }
     
       //--------------------[ TEBAK BENDERA ]--------------------\\
     if (!msg.isBaileys && global.game.includes(from) && global._math.hasOwnProperty(from.split('@')[0]) && chatmessage && !isCmd && !msg.key.fromMe) {
     let jawaban = global._math[from.split('@')[0]].jawaban      
        if (chatmessage.toLowerCase().includes(jawaban)) {  
        let _exp = Math.floor(Math.random() * (2000 - 500 + 1)) + 500
        addExp(msg.sender, _exp) 
       addCoin(msg.sender, global._math[from.split('@')[0]].coin)
        await win(global._math[from.split('@')[0]].coin, getCoin(msg.sender), _exp)
          delete global._math[from.split('@')[0]]
           deleteGame(from)
        } else if(chatmessage == 'nyerah'){
          client.sendMessage(from, { text: 'Anda menyerah, game dibatalkan!\n*Jawaban :* ' + jawaban, mentions: [msg.sender] },{ quoted : msg }) 
          delete global._math[from.split('@')[0]]
           deleteGame(from)
        } else {
        msg.reply(salah)
       }
     }
 }        

        
        function r(_) { return import(_) }