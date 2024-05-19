const { default:SETTING } = await r('../../validator/config.js');
const fs = await r('fs');
const { runtime } = await r('../../lib/function.js');
const { getCoin } = await r('../../lib/inventory.js');
const modul = SETTING['modul'];
const moment = modul['time'];
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss');
/*
  PLUGINS MENU BY @rifza.p.p
*/
export default {

	order: ['menu', 'help'],
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	exec: async (msg, client, from, { q, args, order, prefix }) => {
		const commands = Object.values(global.plugins).map(plugin => plugin);

	
const tagNames = {
  ai: '*<🧠Artificial Intelegen>*',
  downloader: '*<📥Media Downloader>*',
  group: '*<🏢Only Group!>*',
  maker: '*<🖨Maker>*',
  owner: '*<👤Only owner!>*',
  religion: '*<☪️Religion>*',
  game: '*<🎮Game>*',
  RPG: '*<🗺RPG Survival>*',
  tools: '*<🛠Tools>*',
  search: '*<🔍Search>*',
  art: '*<🌌Art Works>*',
  stablediffusion: '*<🫧Stable Diffusion (AI)>*',
  tts: '*<🗣Text To Speech (AI)>*',
  voice_changer: '*<🎙Voice Changer (AI)>*',
  other: '*<Others>*',
  bluearchive: '*<Blue Archive TTS (AI)*',
};

function getCommandsByTag(tag) {
  const matchingCommands = commands.filter(cmd => cmd.tags === tag);
  const commandTexts = matchingCommands.flatMap(cmd => cmd.command);
  return commandTexts;
}

function generateOutputByTags(tags) {
  const frame = {
    brackets: ["[","]"],
    head: '┌',
    body: '│⇨',
     foot: '└',
  };
  let output = `
  Your 🪙Coin: ${getCoin(msg.sender)}
  TotalCmd: ${global.USE_CMD.total}
  Run time : ${runtime(process.uptime())}

`;
  for (const tag of tags) {
    const tagName = tagNames[tag] || tag;
    output += frame['head'] + frame.brackets[0] + ' ' + tagName + ' ' + frame.brackets[1] + '\n';
    const matchingCommands = getCommandsByTag(tag);
    const taggedCommands = matchingCommands.map(cmd => `${frame['body'] + prefix + cmd}`);
    output += taggedCommands.join('\n') + '\n' + frame['foot'];
    output += '\n\n';
  }
  return output.trim();
}

const tags = [...new Set(commands.flatMap(cmd => cmd.tags || []))];

const output = generateOutputByTags(tags) + '\n\n' + SETTING['ownerName'];

const menu = {
  text: "[ ```" + SETTING['botName'] + "``` ]" + '\n\n' + output,
  contextInfo: {
    externalAdReply: {
      title: `${msg.sayingtime + msg.timoji + ' ' + msg.pushName}`,
      body: `TopCMD ⇨ '${prefix + client.cmdS()[0][1]['name']}', use: '${client.cmdS()[0][1]['use']}', times: '${client.cmdS()[0][1]['times']}'`,
      thumbnail: fs.readFileSync('./lib/container/image/thumb.jpg'),
      sourceUrl: SETTING['ig'],
      mediaUrl: "http://ẉa.me/6283110928302/"+Math.floor(Math.random() * 100000000000000000),
      renderLargerThumbnail: true,
      showAdAttribution: true,
      mediaType: 1,
    },
  },
};

client.sendMessage(from, menu, {
  quoted: msg,
});

	},
};
function r(_) { return import(_) }
