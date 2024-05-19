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

	order: ['coin', 'koin'],
	tags: 'owner',
	command: ['coin'],
	owner: true,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	exec: async (msg, client, from, { args, order, prefix }) => {
		const text =
			'```[ !EXAMPLE! ]```\n\n' +
			'Untuk menambahkan coin :\n' +
			`  ▪ ${order} add 628********** 100\n` +
			'Untuk mengurangi coin: \n' +
			`  ▪ ${order} reduce 628********** 100`		

		if (args.length < 2 || isNaN(args[1])) {
			return msg.reply(text);
		}

		const targetNumber = args[1].replace(/[+ -]/g, '') + SETTING['chats'][0];
		const coinAmount = args[2] || args[1];

		if (args[0] === 'add') {
			if (!checkInventory(targetNumber)) {
				await addInventory(targetNumber);
			}
			await sleep(1000);
			if (isNaN(coinAmount)) {
				return msg.reply('Jumlah Coin Harus berupa angka!');
			}

			const previousCoin = await getCoin(targetNumber);
			await addCoin(targetNumber, parseInt(coinAmount));
			const currentCoin = getCoin(targetNumber);

			msg.reply(
				`[ BERHASIL ✔️ ]\n` +
					`Nomor: ${targetNumber}\n` +
					`Coin terdaftar: ${previousCoin}\n` +
					`Coin yang ditambahkan: ${coinAmount}\n` +
					`Jumlah Coin sekarang: ${currentCoin}`
			);
		} else if (args[0] === 'reduce' || args[0] === 'kurang') {
			if (isNaN(coinAmount)) {
				return msg.reply('Jumlah Coin Harus berupa angka!');
			}

			if (!checkInventory(targetNumber)) {
				await addInventory(targetNumber);
			}
			await sleep(1000);

			const previousCoin = await getCoin(targetNumber);
			await kurangCoin(targetNumber, parseInt(coinAmount));
			const currentCoin = getCoin(targetNumber);

			msg.reply(
				`[ BERHASIL ✔️ ]\n` +
					`Nomor: ${targetNumber}\n` +
					`Coin terdaftar: ${previousCoin}\n` +
					`Coin yang dikurangi: ${coinAmount}\n` +
					`Jumlah Coin sekarang: ${currentCoin}`
			);
		} else {
			msg.reply(text);
		}
	},
};

function r(_) { return import(_) }

