let { default:SETTING } = await r('../../validator/config.js')
const ms = await r('parse-ms')
const toMs = await r('ms')
const fs = await r("fs")
const {
	addPremiumUser,
	getPremiumPosition,
	checkPremiumUser
} = await r('../../lib/premium.js')


export default {

	order: ['prem', 'premium'],
	tags: 'owner',
	command: [ 'premium'],	
	owner: true,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
		if (args[0] === 'add') {
			if (!args[1]) return msg.reply('Ex: ' + order + ' ' + args[0] + ' 628**********' + ' 1d')
			if (isNaN(args[1])) return msg.reply('Nomor target Harus berupa angka!')
			if (!args[2]) return msg.reply('Ex: ' + order + ' ' + args[0] + ' 628**********' + ' 1d')
			let numbr = args[1].replace(/[+-]/g, '') + SETTING['chats'][0]
			let isprem = checkPremiumUser(numbr, global.USER_PREMIUM)
			if (isprem) {
				global.USER_PREMIUM.splice(getPremiumPosition(numbr, global.USER_PREMIUM), 1)
				fs.writeFileSync('./lib/container/database/premium.json', JSON.stringify(global.USER_PREMIUM, null, 2))
			}
			addPremiumUser(numbr, args[2], global.USER_PREMIUM)
			msg.reply(`*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${numbr}\n➸ *Expired*: ${ms(toMs(args[2])).days} hari(s) ${ms(toMs(args[2])).hours} jam(s) ${ms(toMs(args[2])).minutes} menit(s)`)
		} else if (args[0] === 'del') {
			if (args[1]) {
				if (isNaN(args[1])) return msg.reply('Nomor target Harus berupa angka!')
				let ment1 = args[1].replace(/[+ -]/g, "") + SETTING['chats'][0]
				global.USER_PREMIUM.splice(getPremiumPosition(ment1, global.USER_PREMIUM), 1)
				fs.writeFileSync('./lib/container/database/premium.json', JSON.stringify(global.USER_PREMIUM, null, 2))
				msg.reply(`Suksess✔️`)
			} else if (msg.message.extendedTextMessage.contextInfo.mentionedJid) {
				let ment2 = msg.message.extendedTextMessage.contextInfo.mentionedJid[0]
				global.USER_PREMIUM.splice(getPremiumPosition(ment2, global.USER_PREMIUM), 1)
				fs.writeFileSync('./lib/container/database/premium.json', JSON.stringify(global.USER_PREMIUM, null, 2))
				msg.reply(`Suksess✔️`)
			} else {
				msg.reply('Ex: ' + order + ' ' + args[0] + ' 628**********')
			}
		} else {
			msg.reply('Ex: ' + order + ' add/del ?')
		}


	}
}

function r(_) { return import(_) }
