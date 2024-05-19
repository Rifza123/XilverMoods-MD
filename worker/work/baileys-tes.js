const { default:SETTING } = await r('../../validator/config.js')
const { runtime } = await r('../../lib/function.js')
let { 
    checkPremiumUser
} = await r('../../lib/premium.js')
let {
	getCoin
} = await r('../../lib/inventory.js');
const fs = await r('fs');


let type = "_WhatsApp-Bot • Multi - Device_"
let lib = `_Baileys Multidevice || ${await JSON.parse(fs.readFileSync("package.json")).dependencies["@whiskeysockets/baileys"]}`
let language = "js"

export default {

    order: ['information','info','tes', 'ping', 'runtime'],
	tags: 'baileys',
	command: ['info'],
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
	
	let moment = SETTING["modul"]['time'];
const jmn = moment.tz('Asia/Jakarta').format('HH:mm:ss')
	let d = new Date
	let locale = 'id'
	let gmt = new Date(0).getTime() - new Date('1 Januari 2023').getTime()
	const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
	const week = d.toLocaleDateString(locale, { weekday: 'long' })
	const calender = d.toLocaleDateString(locale, {
    	day: 'numeric',
    	month: 'long',
    	year: 'numeric'
    })
    
	let poll = {
      key: {
        participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast'
      },
      message: {
        pollCreationMessage: {
           name: SETTING['botName']                                 
        }
      }
     }
	let speed = SETTING.modul.speed
    let timestampe = speed();
    let latensie = speed() - timestampe 
    let prem = await checkPremiumUser(msg.sender, global.USER_PREMIUM) ? "Ya" : "Tidak"          
    let info = `${"```"}[ ${SETTING['botName']} ]${"```"}\n\n`
        info += 
 `
 ┌${"```[ TODAY ]```"}
  ⇨ *Time*: ${jmn} 
  ⇨ *Day*: ${week} || ${weton} 
  ⇨ *Date*: ${calender}
 └
 
┌*${"```[ BOT INFO ]```"}*
  ⇨ *RunTime* = ${runtime(process.uptime())}
  ⇨ *Speed* = ${latensie.toFixed(4)} detik
  ⇨ *BotName :* ${SETTING["botName"]}
  ⇨ *OwnerName :* ${SETTING["ownerName"]}
  ⇨ *Type :* ${type}
  ⇨ *Lib :* ${lib}
  ⇨ *Language :* ${language}
└

┌${"```[ USER-INFORMATION ]``` ]"}
  ⇨ *Username :* ${msg.pushName} 
  ⇨ *Chat :* https:/\/wa.me/\/${msg.sender.replace("@s.whatsapp.net", "")}
  ⇨ *Prefix :* ${prefix}
  ⇨ *Premium*: ${prem}
  ⇨ *Your 🪙Coin*: ${await getCoin(msg.sender)}
└
`

        await client.sendMessage(from, 
          {
            text: info,
            contextInfo: {
              externalAdReply: {
                 title: `${msg.sayingtime + msg.timoji + ' ' + msg.pushName}`,
                 body: "WhatsappBot by @" + SETTING['ownerName'],
                 thumbnail: await fs.readFileSync('./lib/container/image/thumb.jpg'),
                 sourceUrl: SETTING['ig'],
                 mediaUrl: SETTING['ig'],
                 showAdAttribution: true,
                 mediaType: 1,
              },
            },
          }, 
          { quoted: poll })
     }
}
function r(_) { return import(_) }
