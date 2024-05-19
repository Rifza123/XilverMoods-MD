  /**     
      * Coding by @rifza.p.p *     
      
      🩵 Follow ️me on :
      ▪︎ https://youtube.com/@rifza  
      ▪︎ https://github.com/Rifza123
      ▪︎ https://instagram.com/rifza.p.p?igshid=ZGUzMzM3NWJiOQ==
      ▪︎ https://www.threads.net/@rifza.p.p
  */

  import {
  	fileURLToPath
  } from 'url';
  import {
  	watch,
  	createReadStream
  } from 'fs';
  import {
  	createRequire
  } from 'module';
  import {
  	dirname
  } from 'path';
  
  import readline from 'readline';
  import chalk from 'chalk';
  import fs from 'fs';
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const require = createRequire(import.meta.url);  
  
try {
  
  	async function operate() {  		
    
  		const {
  			default: CONFIG
  		} = await r('./validator/config.js');

  		const {
  			pino,
  			nodecache: NodeCache,
  			path,
  			chokidar
  		} = CONFIG.modul;
  		const {
  			spawn,
  			exec
  		} = CONFIG.modul.child;

  		let {
  			Connecting
  		} = await r("./lib/connection/systemConnext.js");
  		const {
  			default: msgsupsert
  		} = await r('./worker/client/msgsupsert.js')
  		const {
  			default: simple
  		} = await r('./lib/simple.js')
  		let {
  			sleep,
  			query
  		} = await r('./lib/function.js');
  		let folderses = './lib/connection'
  		global.query = query
  		let {
  			makeWASocket,
  			useMultiFileAuthState,
  			jidDecode,
  			DisconnectReason,
  			getContentType,
  			fetchLatestBaileysVersion,
  			makeInMemoryStore
  		} = CONFIG.modul.baileys;
  		let {
  			Boom
  		} = CONFIG.modul.boom;
  		let store = makeInMemoryStore({
  			logger: pino().child({
  				level: 'silent',
  				stream: 'store'
  			})
  		});

  		// Pairing Code
  		let pairingCode;

  		const rl = readline.createInterface({
  			input: process.stdin,
  			output: process.stdout
  		});

  		const question = (text) => new Promise((resolve) => rl.question(text, resolve));


  		if (!fs.existsSync(folderses + "/" + CONFIG.sesionName + '/creds.json')) {
  			let quest = `
${chalk.red.bold('╭──────────────────────────────────────────────────────╮')}
${chalk.red.bold('│')} ${chalk.bold('❗️ Anda belum memiliki session ❗️')} ${chalk.red.bold('│')}
${chalk.red.bold('╰──────────────────────────────────────────────────────╯')}
            
${chalk.green('🏷 Pilih salah satu dari opsi berikut untuk menautkan perangkat:')}
${chalk.blue('▪︎ qr')}
${chalk.blue('▪︎ pairing')}
 
${chalk.yellow('* Ketik salah satu dari opsi di atas, contoh:')} ${chalk.blue.bold('pairing')}

${chalk.yellow('Please type here: ')}`;

  			const opsi = await question(quest);
  			if (opsi == "pairing") {
  				pairingCode = true
  			} else if (opsi == "qr") {
  				pairingCode == false
  			} else {
  				console.log(`Pilihan opsi tidak tersedia!`)
  			}
  		}

  		console.log("run");

  		let {
  			state,
  			saveCreds
  		} = await useMultiFileAuthState(folderses + "/" + CONFIG.sesionName);
  		let {
  			version
  		} = fetchLatestBaileysVersion();
  		const msgRetryCounterCache = new NodeCache();
  		const client = makeWASocket({
  			logger: pino({
  				level: 'silent'
  			}),
  			printQRInTerminal: !pairingCode,
  			browser: ['Chrome (Linux)', CONFIG["botName"], '1.0.0'],
  			auth: state,
  			getMessage: async (key) => {
  				if (store) {
  					const msg = await store.loadMessage(key.remoteJid, key.id);
  					return msg.message || undefined;
  				}
  				return {
  					conversation: "Hai Im expertAI"
  				};
  			},
  			generateHighQualityLinkPreview: true,
  			msgRetryCounterCache
  		});
  		console.log(1)
  		client.decodeJid = (jid) => {
  			if (!jid) return jid;
  			if (/:\d+@/gi.test(jid)) {
  				let decode = jidDecode(jid) || {};
  				return decode.user && decode.server && decode.user + '@' + decode.server || jid;
  			} else return jid;
  		};

  		global.exit = function() {
  			Connecting = function() {};
  			console.log(chalk.cyan("Restarting...."));
  			client.end();
  		};

  		let pluginFolder = path.join(__dirname, './worker/work');
  		let pluginFilter = (filename) => /\.js$/.test(filename);
  		global.plugins = {};
  		for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  			try {
  				let {
  					default: pgl
  				} = await r(path.join(pluginFolder, filename));
  				global.plugins[filename] = pgl;
  			} catch (e) {
  				console.log(e);
  				delete global.plugins[filename];
  			}
  		}

  		if (pairingCode && !client.authState.creds.registered) {
  			const phoneNumber = await question(chalk.yellow('Please type your WhatsApp number : '));
  			let code = await client.requestPairingCode(phoneNumber);
  			console.log(chalk.bold.rgb(255, 136, 0)(`
  ╭────────────────────────────╮
  │  ${chalk.yellow('Your Pairing Code:')} ${chalk.greenBright(code)}  │
  ╰────────────────────────────╯
            `));
  		}

  		const watcher = chokidar.watch(path.join(__dirname, './worker/work'), {
  			persistent: true
  		});

  		let throttleTimer = null;
  		const THROTTLE_DELAY = 1000;

  		watcher.on('change', (filePath) => {
  			if (throttleTimer) {
  				return;
  			}

  			let fileName = filePath.replace(path.join(__dirname, './worker/work/'), '');
  			let File = require.resolve(path.join(pluginFolder, fileName));

  			if (!fileName.includes('.bak')) {
  				throttleTimer = setTimeout(async () => {
  					console.log(chalk.yellow(`File "${File}" telah diperbarui`));
  					const timestamp = new Date().getTime();
  					let {
  						default: lll
  					} = await r(path.join(pluginFolder, fileName) + `?t=${timestamp}`);
  					global.plugins[fileName] = lll;
  					if (!global.plugins[fileName]) {
  						delete global.plugins[fileName]
  					}
  					throttleTimer = null;
  				}, THROTTLE_DELAY);
  			}
  		});

  		client.ev.on('connection.update', async (update) => {
  			Connecting({
  				update,
  				client,
  				Boom,
  				DisconnectReason,
  				sleep,
  				operate
  			});
  		});

  		client.ev.on('creds.update', saveCreds);
  		store.bind(client.ev);

  		client.ev.on('messages.upsert', async ({
  			messages
  		}) => {
  			const msg = messages[0];
  			if (!msg.message) return;
  			if (msg.key.remoteJid === 'status@broadcast' && CONFIG.autoreadsw == true) {
  				client.readMessages([msg.key]);
  				let typ = getContentType(msg.message);
  				console.log((/protocolMessage/i.test(typ)) ? `${msg.key.participant.split('@')[0]} Deleted story❗` : 'View user stories : ' + msg.key.participant.split('@')[0]);
  			}
  			const from = msg.key.remoteJid;
  			const {
  			    default: msgsupsert
  	      	} = await r(`./worker/client/msgsupsert.js?t=${Date.now()}`)
     	 	const {
     			default: simple
      		} = await r(`./lib/simple.js?t=${Date.now()}`)
  			simple(client, msg, store);
  			msgsupsert(msg, client, from, store);
  		});

  		client.ev.on('group-participants.update', async (update) => {
  			console.log(update);
  		});
  		
  	}

  	operate();

  

  
    } catch (error) {
       console.log(error)
  }

   process.on('uncaughtException', console.error);
  
  function r(_) {
  	return import(_);
  }