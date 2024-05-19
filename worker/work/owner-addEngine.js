
const fs = await r("fs")
const { default:SETTING } = await r('../../validator/config.js')
let success = SETTING['message'][7]

export default {
  order: ['addengine', 'create_engine'],
  tags: 'owner',
  command: ['addengine'],
  maintenance: false,
  owner: true,
  co_owner: true,
  group: false,
  groupAdmins: false,
  botGroupAdmins: false,
  quotedVideo: false,
  quotedImage: false,
  quotedAudio: false,
  premium: false,
  coin: false,
  quoted: false,
  quotedSticker: false,
  quotedStickerVideo: false,
  quotedUrl: false,
  exec: async (msg, client, from, {
    q,
    args,
    order,
    prefix
  }) => {
    let text1 = q.split("$=>")[0]
    let text2 = q.split("$=>")[1]
    if (!text1) return msg.reply("Contoh! : " + order + ' ' + 'tes.js $=> isi filenya')
    if (!text1) return msg.reply("Contoh! : " + order + ' ' + 'tes.js $=> isi filenya')
    await fs.writeFileSync("./worker/engine/" + text1.trim(), text2)
    setTimeout(async () => { await fs.writeFileSync("./worker/engine/" + text1.trim(), text2) }, 1000)
    msg.reply(success)
  }
}
function r(_) { return import(_) }
