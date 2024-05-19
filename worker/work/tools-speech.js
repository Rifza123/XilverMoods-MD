const { default:SETTING } = await r('../../validator/config.js')
let lang = `
 'af': 'Afrikaans',
 'sq': 'Albanian',
 'ar': 'Arabic',
 'hy': 'Armenian',
 'ca': 'Catalan',
 'zh': 'Chinese',
 'zh-cn': 'Chinese (Mandarin/China)',
 'zh-tw': 'Chinese (Mandarin/Taiwan)',
 'zh-yue': 'Chinese (Cantonese)',
 'hr': 'Croatian',
 'cs': 'Czech',
 'da': 'Danish',
 'nl': 'Dutch',
 'en': 'English',
 'en-au': 'English (Australia)',
 'en-uk': 'English (United Kingdom)',
 'en-us': 'English (United States)',
 'eo': 'Esperanto',
 'fi': 'Finnish',
 'fr': 'French',
 'de': 'German',
 'el': 'Greek',
 'ht': 'Haitian Creole',
 'hi': 'Hindi',
 'hu': 'Hungarian',
 'is': 'Icelandic',
 'id': 'Indonesian',
 'it': 'Italian',
 'ja': 'Japanese',
 'ko': 'Korean',
 'la': 'Latin',
 'lv': 'Latvian',
 'mk': 'Macedonian',
 'no': 'Norwegian',
 'pl': 'Polish',
 'pt': 'Portuguese',
 'pt-br': 'Portuguese (Brazil)',
 'ro': 'Romanian',
 'ru': 'Russian',
 'sr': 'Serbian',
 'sk': 'Slovak',
 'es': 'Spanish',
 'es-es': 'Spanish (Spain)',
 'es-us': 'Spanish (United States)',
 'sw': 'Swahili',
 'sv': 'Swedish',
 'ta': 'Tamil',
 'th': 'Thai',
 'tr': 'Turkish',
 'vi': 'Vietnamese',
 'cy': 'Welsh'`
 
export default {

 order: ['speech', 'tts'],
 	tags: 'tools',
	command: [ 'tts'],
 owner: false,
 co_owner: false,
 group: false,
 groupAdmins: false,
 botGroupAdmins: false, 
 exec: async (msg, client, from, { q, args, order }) => {
 if (args[0] === "list" || args[0] === "daftar") { 
 msg.reply('*List Languages text to speech*\n' + lang)
 } else { 
 let text1 = q.split("|")[0]
 let text2 = q.split("|")[1]
 if (!text1) return msg.reply(`Contoh! : ${order + ' ' + 'id|halo tes'}`) 
 if (!text2) return msg.reply(`Contoh! : ${order + ' ' + 'id|halo tes'}`)
 await msg.speech(from, text1, text2)
 }
 }
}
function r(_) { return import(_) }
