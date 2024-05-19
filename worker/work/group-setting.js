const { default:SETTING } = await r('../../validator/config.js');
const { color } = await r('../../lib/color.js');
const fs = await r("fs")

export default {
	order: ['group', 'grup', 'grub'],
	tags: 'group',
	command: ['group'],
	owner: false,
	group: true,
	exec: async (msg, client, from, { args }) => {
		const commands = {
			close: { setting: 'announcement', message: 'MENUTUP GROUP' },
			open: { setting: 'not_announcement', message: 'MEMBUKA GROUP' },
			'locked-change': { setting: 'locked', message: 'HANYA ADMIN YANG DAPAT MENGEDIT GROUP' },
			'unlocked-change': { setting: 'unlocked', message: 'SEMUA PESERTA DAPAT MENGEDIT GROUP' },
			invitelink: { action: 'invite', message: '' },
			'on-ephemeral': { setting: true, message: '' },
			'off-ephemeral': { setting: false, message: '' },
			'mute': { action: 'mute', reply: `Group: *${client.groupName}* Telah di mute!\n_Sekarang bot tidak akan membalas command di group ini_` },			
			'unmute': { action: 'unmute', reply: `Group: *${client.groupName}* Telah di un-mute!\n_Sekarang bot bisa membalas command di group ini_` },			
			revokeinvitelink: { action: 'revokeInvite', message: 'PEMBARUAN GROUP INVITE CODE' },
			setpp: { action: 'setProfilePicture', message: 'PEMBARUAN IKON GROUP' },
		};

		const command = args[0] || '';
	    const botNumber = client.user.id.split(':')[0] + SETTING['chats'][0]
        const isBotGroupAdmins = client.groupAdmins.includes(botNumber) || false
        const isGroupAdmins = client.groupAdmins.includes(msg.sender)   

		if (!commands.hasOwnProperty(command)) {
			return msg.reply('| open || close || locked-change || unlocked-change || invitelink || revokeinvitelink || setpp || on-ephemeral || off-ephemeral ||')
		}

		const { setting, action, message, reply } = commands[command];
			
        if (action === 'mute') {
            global.MUTE.push(from)
           fs.writeFileSync('./lib/container/database/mute.json', JSON.stringify(global.MUTE, null, 2))
        }
        if (action === 'unmute') {
            global.MUTE.splice(from)
           fs.writeFileSync('./lib/container/database/mute.json', JSON.stringify(global.MUTE, null, 2))
        }
        if (reply) {
		   msg.reply(reply)
	    }
        //only admins
            if (!isGroupAdmins) return msg.reply(SETTING['message'][3])
            
            if (!isBotGroupAdmins) return msg.reply(SETTING['message'][4])
            
        if (setting) {
			await client.groupSettingUpdate(from, setting);
		}
		if (action === 'invite') {
			const inviteCode = await client.groupInviteCode(from);
			msg.reply('https://chat.whatsapp.com/' + inviteCode);
		}

		if (action === 'revokeInvite') {
			await client.groupRevokeInvite(from);
		}

		if (action === 'setProfilePicture') {
			if (!msg.isQuotedImage) {
				return msg.reply('Reply gambar yang akan dijadikan ikon group!');
			}

			client.sendMessage(from, { react: { text: '⏱️', key: msg.key } });

			const buffer = await client.downloadMediaMessage(
				msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage,
				'image'
			);

			const { bufferzzz } = await client.generateProfilePicture(buffer);

			await client.query({
				tag: 'iq',
				attrs: {
					to: from,
					type: 'set',
					xmlns: 'w:profile:picture',
				},
				content: [
					{
						tag: 'picture',
						attrs: { type: 'image' },
						content: bufferzzz,
					},
				],
			});
		}

		if (message) {
			console.log(`${message}: ${color(client.groupName, 'cyan')}`);
			msg.reply(SETTING['message'][7]);
		}
		
	},
};
function r(_) { return import(_) }
