 const { default:SETTING } = await r('../../validator/config.js')
 const fs = await r("fs") 
 const { default:_  }= await r('lodash');
  let data = JSON.parse(fs.readFileSync('./lib/container/database/inventory.json'))
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
  addGajah,     kurangGajah,    getGajah, getRole, getExp
 } = await r('../../lib/inventory.js')
let { 
    checkPremiumUser
   } = await r('../../lib/premium.js')

 export default {

 	order: ['profile', 'profil', 'inventory'],
 	tags: 'RPG',
 	command: ['inventory'],
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
 	  const isGroup = from.endsWith(SETTING['chats'][1])
 	  const myowner = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
 	  const botNumber = client.user.id.split(':')[0] + SETTING['chats'][0]
      const prem = await checkPremiumUser(msg.sender, global.USER_PREMIUM) ? "Ya" : "Tidak"          
      const isOwner = [botNumber, ...global.ownerNumber].map(jid => jid.replace(/[^0-9]/g, '') + SETTING['chats'][0]).includes(myowner) ? "Ya" : "Tidak"   
      const isUmpan = getUmpan(msg.sender)
      const sortedDataCoin = _.orderBy(data, ['coin'], ['desc'])
      const sortedDataExp = _.orderBy(data, ['exp'], ['desc'])
      const sortedDataEmerald = _.orderBy(data, ['emerald'], ['desc'])
      const sortedDataEmas = _.orderBy(data, ['emas'], ['desc'])
      const sortedDataBesi = _.orderBy(data, ['besi'], ['desc'])
      const sortedDataGajah = _.orderBy(data, ['gajah'], ['desc'])
      const sortedDataSapi = _.orderBy(data, ['sapi'], ['desc'])
      const sortedDataDomba = _.orderBy(data, ['domba'], ['desc'])
      const sortedDataKelinci = _.orderBy(data, ['kelinci'], ['desc']) 
      const sortedDataAyam = _.orderBy(data, ['ayam'], ['desc'])
      const sortedDataIkan = _.orderBy(data, ['ikan'], ['desc'])
 
      const Coin = _.take(sortedDataCoin, data.length)
      const Exp = _.take(sortedDataExp, data.length)      
      const Emerald = _.take(sortedDataEmerald, data.length)
      const Emas = _.take(sortedDataEmas, data.length)
      const Besi = _.take(sortedDataBesi, data.length)      
      const Gajah = _.take(sortedDataGajah, data.length)      
      const Sapi = _.take(sortedDataSapi, data.length)
      const Domba = _.take(sortedDataDomba, data.length)
      const Kelinci = _.take(sortedDataKelinci, data.length)
      const Ayam = _.take(sortedDataAyam, data.length)
      const Ikan = _.take(sortedDataIkan, data.length)
 
      let _coin = Coin.map(a => a.id)
      let _exp = Exp.map(a => a.id)
      let _level = Exp.map(a => a.id)
      let _emerald = Emerald.map(a => a.id)
      let _emas = Emas.map(a => a.id)
      let _besi = Besi.map(a => a.id)
      let _gajah = Gajah.map(a => a.id)
      let _sapi = Sapi.map(a => a.id)
      let _domba = Domba.map(a => a.id)
      let _kelinci = Kelinci.map(a => a.id)
      let _ayam = Ayam.map(a => a.id)
      let _ikan = Ikan.map(a => a.id)
      let _role = Exp.map(a => a.id)
      
      let topcoin = _coin.indexOf(msg.sender) + 1
      let toprole = _role.indexOf(msg.sender) + 1      
      let topexp = _exp.indexOf(msg.sender) + 1
      let toplevel = _level.indexOf(msg.sender) + 1
      let topemerald = _emerald.indexOf(msg.sender) + 1
      let topemas = _emas.indexOf(msg.sender) + 1
      let topbesi = _besi.indexOf(msg.sender) + 1
      let topgajah = _gajah.indexOf(msg.sender) + 1
      let topsapi = _sapi.indexOf(msg.sender) + 1
      let topdomba = _domba.indexOf(msg.sender) + 1
      let topkelinci = _kelinci.indexOf(msg.sender) + 1
      let topayam = _ayam.indexOf(msg.sender) + 1
      let topikan = _ikan.indexOf(msg.sender) + 1
      
            try {
              var ppuser = await client.profilePictureUrl(msg.sender, 'image')
             } catch  {
               var ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
            }
            let txt = `_[ 👩🏻‍💼INFO USER👨🏻‍💼 ]_\n\n`
               txt += `*Username :* ${msg.pushName}\n`
               txt += `*Chat :* https:/\/wa.me/\/${msg.sender.replace("@s.whatsapp.net", "")}\n`
               txt += `*Prefix :* ${prefix}\n`
               txt += `*isPremium*: ${prem}\n`
               txt += `*isOwner*: ${isOwner}\n`
               txt += `*🔰Level* : ${getRole(msg.sender).level || '0'}\n`                         
               txt += `*⚜️Role* : ${getRole(msg.sender).role || '0'}\n`                                        
               txt += `*🔹️️Exp* : ${getExp(msg.sender) || '0'}\n`                         
               txt += `*❤️Darah* : ${getDarah(msg.sender) || '0'}\n`
               txt += `*🪙Coin* : ${getCoin(msg.sender) || '0'}\n`
               txt += `*◻️️Besi* : ${getBesi(msg.sender)  || '0'}\n`
               txt += `*🌟Emas* : ${getEmas(msg.sender) || '0'}\n`
               txt += `*💎Emerald* : ${getEmerald(msg.sender) || '0'}\n`
               txt += `*🧪Potion* : ${getPotion(msg.sender) || '0'}\n`
               txt += `*🪱Umpan* : ${isUmpan}\n\n`               
               txt += `_[ 🐺HASIL BURUAN🐺 ]_\n`
               txt += `*🐟Ikan* : ${getIkan(msg.sender) || '0'}\n`
               txt += `*🐔Ayam* : ${getAyam(msg.sender) || '0'}\n`
               txt += `*🐇Kelinci* : ${getKelinci(msg.sender) || '0'}\n`
               txt += `*🐑Domba* : ${getDomba(msg.sender) || '0'}\n`
               txt += `*🐄Sapi* : ${getSapi(msg.sender) || '0'}\n`
               txt += `*🐘Gajah* : ${getGajah(msg.sender) || '0'}\n\n\n`       
               txt += "[ PERINGKAT ]\n"
               txt += ` - *Level* : ${toplevel}\n`                         
               txt += ` - *Role* : ${toprole}\n`                                        
               txt += ` - *Exp* : ${topexp}\n`                         
               txt += ` - *Coin* : ${topcoin}\n`
               txt += ` - *Besi* : ${topbesi}\n`
               txt += ` - *Emas* : ${topemas}\n`
               txt += ` - *Emerald* : ${topemerald}\n`
               txt += ` - *Ikan* : ${topikan}\n`
               txt += ` - *Ayam* : ${topayam}\n`
               txt += ` - *Kelinci* : ${topkelinci}\n`
               txt += ` - *Domba* : ${topdomba}\n`
               txt += ` - *Sapi* : ${topsapi}\n`
               txt += ` - *Gajah* : ${topgajah}\n\n`  
               txt += `Dari total ${data.length + 1} User`            
    const imageMessage = {
        text: txt,
        contextInfo: {
          externalAdReply: {
            thumbnailUrl: ppuser,
            mediaUrl: "http://ẉa.me/6283110928302/"+Math.floor(Math.random() * 100000000000000000),
            renderLargerThumbnail: true,
            showAdAttribution: true,
            mediaType: 1,
          },
        }
    }
            client.sendMessage(from, imageMessage, { quoted: msg })
          
  }
 }
 function r(_) { return import(_) }

 
 
