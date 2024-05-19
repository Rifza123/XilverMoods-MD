const { default:_ }= await r('lodash');
const fs = await r("fs")

export default {
	order: ['topcoins','topcoin'],
	tags: 'other',
	command: ['topcoins'],
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
 let data = JSON.parse(fs.readFileSync('./lib/container/database/inventory.json'))
 const {
 	getCoin
 } = await r('../../lib/inventory.js')
 
 
 const sortedData = _.orderBy(data, ['coin'], ['desc'])
 let mentions = []
 const inv = _.take(sortedData, 15)
 let txt = "*[ TOP 15 USERS WITH THE MOST COINS ]*\n\n"
 for(let i = 1; i < inv.length; i++){
 txt += `#${i} User: @${inv[i-1].id.split("@")[0]}\n`
 txt += ` -> coin: _🪙${await getCoin(inv[i-1].id)}_\n\n`
 mentions.push(inv[i-1].id)
 }
 let message = {
 text: txt, 
 mentions: mentions 
 
 }
 await client.sendMessage(from, message, {
 quoted: msg,
 });
	}
}
function r(__) { return import(__) }
