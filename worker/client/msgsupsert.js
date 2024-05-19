const {
	default: SET
} = await r('../../validator/config.js'+ '?t=' + Date.now())
const harga = SET['harga']
const modul = SET['modul']
const fs = modul['fs'];
const chalk = modul['chalk'];
const moment = modul['time'];
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const util = modul['util'];
import {
	fileURLToPath
} from 'url';
const __filename = fileURLToPath(import.meta.url);
import {
	watch
} from 'fs';
let {
	default: getContentType,
	generateWAMessageFromContent,
	proto
} = modul['baileys']
let {
	color,
	bgcolor
} = await r('../../lib/color.js')
const {
	spawn,
	exec
} = modul['child']
const {
	getBuffer,
	fetchJson
} = await r('../../lib/function.js'+ '?t=' + Date.now())
let {
	addInventory,
	checkInventory,
	addCoin,
	kurangCoin,
	getCoin,
	getUmpan
} = await r('../../lib/inventory.js')
let {
	expiredCheck,
	checkPremiumUser
} = await r('../../lib/premium.js')
let {
	gameMachine
} = await r("../engine/game.js"+ '?t=' + Date.now())

global.fetchJson = fetchJson
global.getBuffer = getBuffer
global.SETTING = SET

const axios = modul['axios'];
const cheerio = modul['cheerio']

const upsert = async (msg, client, from, store) => {
	/*<--------------------( detect )--------------------->*/
	var CMD = (msg.xtype === 'conversation' && msg.message.conversation) ? msg.message.conversation : (msg.xtype == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (msg.xtype == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (msg.xtype == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (msg.xtype == 'buttonsResponseMessage') && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (msg.xtype == 'listResponseMessage') && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (msg.xtype == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ""
	var prefix = /^[#‽٪]/.test(CMD) ? CMD.match(/^[#‽٪]/gi) : '!'
	global.prefix = prefix
	var chatmessage = (msg.xtype === 'conversation' && msg.message.conversation) ? msg.message.conversation : (msg.xtype == 'imageMessage') ? msg.message.imageMessage.caption : (msg.xtype == 'videoMessage') ? msg.message.videoMessage.caption : (msg.xtype == 'extendedTextMessage') ? msg.message.extendedTextMessage.text : (msg.xtype == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : (msg.xtype == 'listResponseMessage') ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (msg.xtype == 'templateButtonReplyMessage') ? msg.message.templateButtonReplyMessage.selectedId : (msg.xtype === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId || msg.text) : ''
	var ordermessage = (msg.xtype === 'conversation' && msg.message.conversation) ? msg.message.conversation : (msg.xtype == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (msg.xtype == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (msg.xtype == 'extendedTextMessage') && msg.message.extendedTextMessage.text.startsWith(prefix) ? msg.message.extendedTextMessage.text : (msg.xtype == 'buttonsResponseMessage') && msg.message.buttonsResponseMessage.selectedButtonId.startsWith(prefix) ? msg.message.buttonsResponseMessage.selectedButtonId : (msg.xtype == 'listResponseMessage') && msg.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (msg.xtype == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId.startsWith(prefix) ? msg.message.templateButtonReplyMessage.selectedId : ""
	var chats = (msg.xtype === 'conversation' && msg.message.conversation) ? msg.message.conversation : (msg.xtype == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (msg.xtype == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (msg.xtype == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (msg.xtype == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (msg.xtype == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (msg.xtype == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
	const args = ordermessage.trim().split(/ +/).slice(1)
	const order = ordermessage.slice(0).trim().split(/ +/).shift().toLowerCase()
	const command = ordermessage.slice(1)
	const q = args.join(' ') ?
		args.join(' ') :
		msg.quoted?.text ? msg.quoted.text :
		null
	const quoted = msg.quoted ? msg.quoted : msg
	const isCmd = ordermessage.startsWith(prefix)
	const isMute = MUTE.includes(from)
	const orderPlugins = isCmd ? ordermessage.slice(1).trim().split(/ +/).shift().toLowerCase() : null
	const isGroup = from.endsWith(SETTING['chats'][1])
	global.botNumber = client.user.id.split(':')[0] + SETTING['chats'][0]
	const isMedia = (msg.xtype === 'imageMessage' || msg.xtype === 'videoMessage' || msg.xtype === 'viewOnceMessageV2')
	const myowner = msg.sender
	const isOwner = [botNumber, ...global.ownerNumber].map(jid => jid.replace(/[^0-9]/g, '') + SETTING['chats'][0]).includes(myowner) ? true : msg.key.fromMe ? true : false
	const isInventory = checkInventory(msg.sender)
	const groupMetdata = isGroup ? await client.groupMetadata(from) : ''
	client.groupMembers = isGroup ? groupMetdata.participants : ''
	client.groupName = isGroup ? await groupMetdata.subject : ''
	client.groupAdmins = isGroup ? msg.getGroupAdmins(client.groupMembers) : ''
	const isBotGroupAdmins = client.groupAdmins.includes(botNumber) || !1
	const isGroupAdmins = client.groupAdmins.includes(msg.sender)
	const isPremium = checkPremiumUser(msg.sender, global.USER_PREMIUM)
	const isCoin = getCoin(msg.sender)

	if (!isGroup && chatmessage) {
		SETTING["autotyping"] && client.sendPresenceUpdate('composing', from);
		const prefix = bgcolor('[ PRRV ]', 'red') + ' >';
		const fromText = 'From:';
		const userText = 'User:';
		console.log(`${prefix} ${fromText} ${color(msg.pushName, 'cyan')} Conversation: ${color(chatmessage, 'green')}`);
	}

	if (isGroup) {
		const prefix = bgcolor('[ GR ]', 'pink') + ' >';
		const fromText = 'From:';
		const userText = 'User:';
		console.log(`${prefix} ${fromText} ${color(from, 'cyan')} ${userText} ${color(msg.pushName, 'cyan')} Conversation: ${color(chatmessage, 'green')}`);
	}

	//only for self

	if (msg.isBaileys) return

	//!0 = self / !1 = public 
	//!0 = true / !1 = false
	if (SETTING["banchats"] == !0) {
		if (!isOwner && !msg.key.fromMe) return
	}
	if (isGroup && isMute && !isOwner && !isGroupAdmins) {
		return
	}

	/*<--------------------( cmd top )--------------------->*/
	client.addCmd = () => {
		global.USE_CMD.total += 1
		fs.writeFileSync('./lib/container/database/cmd.json', JSON.stringify(global.USE_CMD, null, 2))
	}

	client.addCMDForTop = (NAMEQ, timw) => {
		try {
			let cekhN = global.USE_CMD.cmd.find(i => i.name.includes(NAMEQ))
			if (cekhN) {
				let cemed = global.USE_CMD.cmd.find(i => i.name == NAMEQ)
				var ussd = global.USE_CMD.cmd.indexOf(cemed)
				if (!global.USE_CMD.cmd[ussd]) {
					global.USE_CMD.cmd[ussd].use = 0
				}
				global.USE_CMD.cmd[ussd].use += 1;
				global.USE_CMD.cmd[ussd].times = timw;
				fs.writeFileSync('./lib/container/database/cmd.json', JSON.stringify(global.USE_CMD, null, 2))
			} else {
				global.USE_CMD.cmd.push({
					name: NAMEQ,
					use: 1,
					times: timw
				})
				fs.writeFileSync('./lib/container/database/cmd.json', JSON.stringify(global.USE_CMD, null, 2))
			}
		} catch (e) {
			console.error(e)
		}
	}

	client.cmdS = () => {
		return Object.entries(global.USE_CMD.cmd).sort((a, b) => b[1].use - a[1].use);
	};

	client.topCmd = (i = 10) => {
		const cmdS = client.cmdS();
		const LIST_TOP = cmdS.slice(0, i).map(([name, data]) => `${prefix}${data.name}(${data.use}) || ${data.times}`);
		return LIST_TOP;
	};
	/*<--------------------( cmd top )--------------------->*/
	for (let name in plugins) {
		let plugin = plugins[name]
		if (plugin.order && plugin.order.includes(orderPlugins)) {
			let turn = plugin.order instanceof Array ?
				plugin.order.includes(orderPlugins) :
				plugin.order instanceof String ?
				plugin.order == orderPlugins :
				!1
			if (!turn) continue

			await client.addCMDForTop(order.slice(1), time)
			await client.addCmd()

			if (!isInventory) {
				await addInventory(msg.sender)
			}
			if (plugin.maintenance) {
				msg.reply(`Maaf, Fitur : ${order} sedang dalam pemeliharaan,\nSilahkan coba lain kali ya :(`)
				continue
			}
			if (plugin.owner && !isOwner) {
				msg.reply(SETTING['message'][2])
				continue
			}
			if (plugin.group && !isGroup) {
				msg.reply(SETTING['message'][1])
				continue
			}
			if (plugin.private && isGroup) {
				msg.reply("Khusus Private!")
				continue
			}
			if (plugin.groupAdmins && !isGroupAdmins) {
				msg.reply(SETTING['message'][3])
				continue
			}
			if (plugin.botGroupAdmins && !isBotGroupAdmins) {
				msg.reply(SETTING['message'][4])
				continue
			}
			if (plugin.co_owner && !isOwner) {
				msg.reply(SETTING['message'][2])
				continue
			}
			if (plugin.premium && !isPremium && !isOwner) {
				msg.reply(SETTING['message'][9])
				continue
			}
			if (plugin.quotedSticker && !msg.isQuotedSticker) {
				msg.reply(plugin.quotedSticker)
				continue
			}
			if (plugin.quotedStickerVideo && !msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage?.isAnimated == !0) {
				msg.reply(plugin.quotedStickerVideo)
				continue
			}
			if (plugin.quotedVideo && !msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage) {
				msg.reply(plugin.quotedVideo)
				continue
			}
			if (plugin.quotedImage && !msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
				msg.reply(plugin.quotedImage)
				continue
			}
			if (plugin.quotedAudio && !msg.message.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage) {
				msg.reply(plugin.quotedAudio)
				continue
			}
			if (plugin.quoted && !q) {
				msg.reply(plugin.quoted)
				continue
			}
			if (plugin.quotedUrl && !q.includes(plugin.quotedUrl.url)) {
				msg.reply(plugin.quotedUrl.reply)
				continue
			}

			if (plugin.isUmpan && isUmpan < 1) {
				msg.reply('Umpan kamu habis!, cobalah jual hasil buruan kamu dan ubah menjadi umpan')
				continue
			}

			if (plugin.coin && !isPremium) {
				let _harga = harga[plugin.coin]
				if (isCoin < _harga) {
					return msg.reply(`Coin kamu tidak mencukupi untuk melakukan tindakan ini!\n • Coin tersisa: 🪙${isCoin} \n • Membutuhkan: 🪙${_harga}\n\n_Untuk mendapatkan koin, kamu bisa meminta teman untuk mentransfer coin ke kamu_\n -> .transfer 628********** jumlah`);
				}

				await kurangCoin(msg.sender, parseInt(_harga));
				msg.reply(`-${_harga} 🪙coin`);
			}


			await plugin.exec(msg, client, from, {
				q,
				args,
				order,
				prefix,
				isMedia,
				store
			})


		}
	}


	switch (order) {
		//!!!!!!!!!!!❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️❗️!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		/* ❗️Tambah fitur atau case disini!!❗
		Contoh: 
		 case prefix + 'commandnya': {
		 }
		 break
		️ */
	}
	/*<--------------------( game )--------------------->*/

	gameMachine(client, chatmessage, msg, from, isCmd)

	/*<--------------------( game )--------------------->*/

	/*<--------------------( eval )--------------------->*/
	if (chatmessage.startsWith('=>')) {
		if (!isOwner) return

		function Return(sul) {
			sat = JSON.stringify(sul, null, 2)
			bang = util.format(sat)
			if (sat == undefined) {
				bang = util.format(sul)
			}
			return msg.reply(bang)
		}
		try {
			msg.reply(util.format(eval(`(async () => { ${chatmessage.slice(3)} })()`)))
		} catch (e) {
			msg.reply(String(e))
		}
	}
	if (chatmessage.startsWith('>')) {
		if (!isOwner) return
		try {
			let evaled = await eval(chatmessage.slice(2))
			if (typeof evaled !== 'string') evaled = await util.inspect(evaled)
			await msg.reply(evaled)
		} catch (err) {
			msg.reply(String(err))
		}
	}
	if (chatmessage.startsWith('$')) {
		if (!isOwner) return
		exec(chatmessage.slice(2), (err, stdout) => {
			if (err) return client.sendMessage(from, {
				text: String(err)
			}, {
				quoted: msg
			})
			if (stdout) return msg.reply(stdout)
		})
	}
	/*<--------------------( eval )--------------------->*/

}

watch(__filename, async () => {
	const timestamp = new Date().getTime();
	console.log(chalk.yellow(`New ${__filename}`))
})

export default upsert

function r(_) {
	return import(_)
}