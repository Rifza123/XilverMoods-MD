import fs from 'fs';
import fetch from 'node-fetch';
import chalk from 'chalk';
import axios from 'axios';
import baileys from "@whiskeysockets/baileys";
import boom from '@hapi/boom';
import cheerio from "cheerio";
import child from 'child_process';
import chokidar from 'chokidar';
import https from 'https';
import jimp from 'jimp';
import ms from 'parse-ms';
import NodeCache from "node-cache";
import path from "path";
import pino from "pino";
import qrcode from 'qrcode';
import request from 'request';
import readline from "readline";
import speed from 'performance-now';
import time from "moment-timezone";
import util from "util";
import cekprem from 'parse-ms';
import form from 'form-data'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
export default {
    ig: "https://instagram.com/rifza.p.p",
    autoreadsw: !0,
    autotyping: !1,
    sesionName: "session",
    botName: "Expert - AI",
    banchats: !1,
    ownerName: 'Ⓒrifza.p.p',
    coinawal: 1000,
    darahawal: 100,
    besiawal: 15,
    emasawal: 10,
    emeraldawal: 5,
    umpanawal: 5,
    expawal: 0,
    potionawal: 1,
    rpg: {
        mining: {
            max: 5,
            cd: 3600000
        },
        mancing: {
            max: 5,
            cd: 3600000
        },
        berburu: {
            max: 5,
            cd: 3600000
        }
    },
    harga: {
        normal: 45,
        medium: 65,
        high: 100,
        expensive: 150,
        tiktok: 59,
        threads: 47,
        ytmp3: 64,
        ytmp4: 87,
        ssweb: 65,
        img_generation: 100,
        chatbot: 900
    },
    message: [
        '[ *[❗]CHAT DITERUSKAN[❗]* ]',
        'Khusus Group!',
        'Khusus Owner!',
        'Khusus Admin!',
        'Bot bukan Admin!',
        '```「▰▰▱▱▱▱▱▱▱▱」Loading...```',
        '```「▰▰▰▰▰▰▰▰▱▱」Sending...```',
        '「▰▰▰▰▰▰▰▰▰▰」Success✓!',
        "Masukan nomer target",
        'Khusus member premium!'
    ],
    chats: ['@s.whatsapp.net', '@g.us'],
    mode: ['[ PUBLIC - MODE ]', '[ SELF - MODE ]'],
    modul: {
        axios,
        baileys,
        boom,
        chalk,
        cheerio,
        child,
        chokidar,
        fs,
        https,
        jimp,
        ms,
        nodecache: NodeCache,
        path,
        pino,
        qrcode,
        request,
        readline,
        speed,
        time,
        util,
        cekprem,
        form
    }
};

  const { watch } = fs
  const db = './lib/container/database/'
  if (!fs.existsSync(db + 'cmd.json')) {
  	fs.writeFileSync(db + 'cmd.json', JSON.stringify({
  		"total": 0,
  		"cmd": []
  	}, null, 2))
  }
  if (!fs.existsSync(db + 'userchat.json')) {
  	fs.writeFileSync(db + 'userchat.json', JSON.stringify([]))
  }
  if (!fs.existsSync(db + 'mute.json')) {
  	fs.writeFileSync(db + 'mute.json', JSON.stringify([]))
  }
  if (!fs.existsSync(db + 'co_owner.json')) {
  	fs.writeFileSync(db + 'co_owner.json', JSON.stringify([]))
  }
  if (!fs.existsSync(db + 'premium.json')) {
  	fs.writeFileSync(db + 'premium.json', JSON.stringify([]))
  }
  if (!fs.existsSync(db + 'inventory.json')) {
  	fs.writeFileSync(db + 'inventory.json', JSON.stringify([]))
  }

global.ownerNumber = ["6283110928302"];
global.MUTE = JSON.parse(fs.readFileSync('./lib/container/database/mute.json'));
global.USE_CMD = JSON.parse(fs.readFileSync('./lib/container/database/cmd.json'))
global.USER_PREMIUM = JSON.parse(fs.readFileSync('./lib/container/database/premium.json'));

global.use = []
//game
global.game = []
global._tebakkata = []
global._tebakgambar = []
global._siapakahaku = []
global._tebakbendera = []
global._math = []
const gameTypes = [
  'game',
  'tebakkata',
  'susunkata',
  'siapakahaku',
  'tebakbendera',
  'tebakgambar'
];

gameTypes.forEach(type => {
  const filename = `${type}.json`
  const filePath = db + filename;
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
    global[["game"].includes(type) ? "game": `_${type}`] = [];
  } else {
        global[["game"].includes(type) ? "game": `_${type}`] = [];
  }
})

global.api = {
    rifza: {
        url: "https://rifza.me",
        key: "Clara37211"
    }
}

watch(__filename, async() => {
    const timestamp = new Date().getTime();
  	console.log(chalk.yellow(`New ${__filename}`))
})