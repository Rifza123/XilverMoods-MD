const { default:SETTING } = await r('../../validator/config.js');
const {
	addInventory,
	checkInventory,
	addCoin,
	kurangCoin,
	getCoin
} = await r('../../lib/inventory.js');
const { sleep } = await r('../../lib/function.js');

export default {
	order: ['transfer', 'tf'],
	tags: 'other',
	command: ['transfer'],
	owner: false,
	co_owner: false,
	quoted: '```[ !EXAMPLE! ]```\n\n' + '▪ .<command> 628********** 100',
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	exec: async (msg, client, from, { args, order, prefix }) => {
		const text =
			'```[ !EXAMPLE! ]```\n\n' +		
			`  ▪ ${order} 628********** 100\n`			
	     if(!args[0] || !args[1]) return msg.reply(text)
		const targetNumber = args[0].replace(/[+ -]/g, '') + SETTING['chats'][0];
		const coinAmount = args[1]

		if (!checkInventory(targetNumber)) {
				await addInventory(targetNumber);
			}
        if (!checkInventory(msg.sender)) {
				await addInventory(msg.sender);
			}
			await sleep(1000);
			if (isNaN(coinAmount)) {
				return msg.reply('Jumlah Coin Harus berupa angka!');
			}
			let giveCoin = await getCoin(msg.sender);
			if(giveCoin < coinAmount) return msg.reply(`Coin kamu tidak cukup!\nKamu hanya memiliki 🪙${giveCoin} coin\nJumlah koin yang kurang : ${giveCoin - coinAmount}`)
			const previousCoin = await getCoin(targetNumber);			
			await addCoin(targetNumber, parseInt(coinAmount));
			await kurangCoin(msg.sender, parseInt(coinAmount));
			const currentCoin = getCoin(targetNumber);
            const yourCoin = getCoin(msg.sender);
			msg.reply(
				`[ BERHASIL ✔️ ]\n` +
					`Nomor: ${targetNumber}\n` +
					`Coin terdaftar: ${previousCoin}\n` +
					`Coin yang ditransfer: ${coinAmount}\n` +
					`Jumlah Coin sekarang: ${currentCoin}\n` +
					'<-------------------------------->\n' +
					`Sisa coin anda : ${yourCoin}\n\n` +
					'_Pastikan nomornya sudah benar ya 😊_'
			);
	},
};
function r(_) { return import(_) }
