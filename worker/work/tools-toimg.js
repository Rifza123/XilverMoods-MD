const fs = await r("fs")
const { default:SETTING } = await r('../../validator/config.js')
let success = SETTING['message'][7]
const { exec } = SETTING['modul']['child']
const { getRandom } = await r('../../lib/function.js')
export default {

	order: ['toimg'],
	tags: 'tools',
	command: [ 'toimg' ],
	quoted: false,
	quotedUrl: false,
	quotedSticker: 'Reply Stickernya!', 
	quotedStickerVideo: false,
	owner: false,
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
      let buffer = await client.downloadAndSaveMediaMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
             let filename = getRandom('.jpg')
             exec(`ffmpeg -i ${buffer} ${filename}`, async(err) => {
              fs.unlinkSync(buffer)
              if (err) return msg.reply(err)
              let buffr = fs.readFileSync(filename)
              await client.sendMessage(from, { image: buffr, caption: success}, { quoted: msg })
             .then(() => { fs.unlinkSync(filename) })
             })
	}
}
function r(_) { return import(_) }