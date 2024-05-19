let { default:SETTING } = await r('../../validator/config.js')
export default {

	order: ['mode', 'for'],
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
		if (!args[0]) return msg.reply(" Ex: " + order + " self/public")
		if (args[0] === "self") {
			SETTING['banchats'] = !0
			msg.reply(SETTING["mode"][1])
		} else if (args[0] === "public") {
			SETTING['banchats'] = !1
			msg.reply(SETTING["mode"][0])
		} else {
			msg.reply(" Ex: " + order + " self/public")
		}
	}
}
function r(_) { return import(_) }
