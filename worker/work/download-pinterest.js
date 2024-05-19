const {
	default: SETTING
} = await r('../../validator/config.js')

const {
	sleep
} = await r('../../lib/function.js')

let loading = SETTING['message'][5]
let sending = SETTING['message'][6]
let success = SETTING['message'][7]

export default {
	order: ['pinterestdl', 'pindl'],
	tags: 'downloader',
	command: ['pinterestdl'],
	quoted: 'linknya?',
	coin: 'normal',
	quotedSticker: false,
	quotedStickerVideo: false,
	quotedUrl: {
		url: 'http',
		reply: 'Gunakan link!!'
	},
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	quotedVideo: false,
	exec: async (msg, client, from, {
		q,
		args,
		order,
		prefix
	}) => {
		await sleep(1000)
		let proces = await client.sendMessage(from, {
			text: loading
		}, {
			quoted: msg
		})
		try {
			let opts = {
				path: "/api/pinterest/downloader",
				params: {
					link: encodeURIComponent(q),
				}
			};

			let url = query(api.rifza.url + opts.path, opts.params);
			let tool = await fetchJson(url);
			console.log(Object.values(tool.videos)[0].url)
			let aud = {
				video: {
					url: Object.values(tool.videos)[0].url
				},
				mimetype: 'video/mp4'
			}
			await client.editMessage(from, proces.key.id, sending)
			await client.sendMessage(from, aud, {
				quoted: msg
			})
			client.editMessage(from, proces.key.id, success)
		} catch (e) {
			console.error(e)
			client.editMessage(from, proces.key.id, `Type-Err! :\n${e}`)
		}

	}
}

function r(_) {
	return import(_)
}