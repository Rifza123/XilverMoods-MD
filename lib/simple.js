const { getContentType, downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, proto } = await (await r('@whiskeysockets/baileys')).default
import { exec } from "child_process";
import fs from 'fs';
import jimp from 'jimp';
import chalk from 'chalk';
import axios from 'axios';
import FileType from 'file-type';
import { getBuffer, getRandom } from './function.js';
import SETTING from '../validator/config.js';
import moment from 'moment-timezone';
const thumb = fs.readFileSync("./lib/container/image/thumb.jpg");
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss');
  import { fileURLToPath } from 'url';

  const __filename = fileURLToPath(import.meta.url);
  import { watch } from 'fs';
  import { createRequire } from 'module';
export default async function handleMessages(client, msg, store) {

    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
    let morph = msg
    let ID
    const from = morph.key.remoteJid
    if (!msg) return msg
    if (morph.key) {
        ID = msg.key.id
        msg.isBaileys = ID.startsWith('BAE5') && ID.length === 16
        msg.sender = client.decodeJid(msg.Me && client.user.id || msg.participant || msg.key.participant || msg.key.remoteJid || '')
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//    
    if (msg.message) {
        msg.msgType = Object.keys(msg.message)[0]
        msg.xtype = getContentType(msg.message)
        msg.isMedia = (msg.xtype === 'imageMessage' || msg.xtype === 'videoMessage')
        msg.content = JSON.stringify(msg.message)
        msg.isQuotedImage = msg.xtype === 'extendedTextMessage' && msg.content.includes('imageMessage')
        msg.isQuotedVideo = msg.xtype === 'extendedTextMessage' && msg.content.includes('videoMessage')
        msg.isQuotedAudio = msg.xtype === 'extendedTextMessage' && msg.content.includes('audioMessage')
        msg.isQuotedSticker = msg.xtype === 'extendedTextMessage' && msg.content.includes('stickerMessage')
        msg.isQuotedTag = msg.xtype === 'extendedTextMessage' && msg.content.includes('mentionedJid')
        msg.isQuotedReply = msg.xtype === 'extendedTextMessage' && msg.content.includes('Message')
        msg.isQuotedLocation = msg.xtype === 'extendedTextMessage' && msg.content.includes('locationMessage')
        msg.msg = (msg.xtype == 'viewOnceMessage' ? msg.message[msg.xtype].message[getContentType(msg.message[msg.xtype].message)] : msg.message[msg.xtype])
        if (msg.msg) {
            let quoted = msg.quoted = msg.msg.contextInfo ? msg.msg.contextInfo.quotedMessage : null
            if (msg.quoted) {
                let type = getContentType(quoted)
                if (['productMessage'].includes(type)) {
                    type = getContentType(msg.quoted)
                    msg.quoted = msg.quoted[type]
                }
                if (typeof msg.quoted === 'string') msg.quoted = {
                    text: msg.quoted
                }
                try {
                    const context = msg.message[msg.xtype].contextInfo.quotedMessage
                    if (context["ephemeralMessage"]) {
                        msg.quotedMsg = context.ephemeralMessage.message
                    } else {
                        msg.quotedMsg = context
                    }
                    msg.isQuotedMsg = true
                    msg.quotedMsg.sender = msg.message[msg.xtype].contextInfo.participant
                    msg.quotedMsg.fromMe = msg.quotedMsg.sender === conn.user.id.split(':')[0] + '@s.whatsapp.net' ? true : false
                    msg.quotedMsg.type = Object.keys(msg.quotedMsg)[0]
                    let ane = msg.quotedMsg
                    msg.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : (ane.type == 'buttonsMessage') && ane.buttonsMessage.contentText ? ane.buttonsMessage.contentText : ""
                    msg.quotedMsg.id = msg.message[msg.xtype].contextInfo.stanzaId
                } catch {
                    msg.quotedMsg = null
                    msg.isQuotedMsg = false
                }
                //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//    
                msg.quoted.id = msg.msg.contextInfo.stanzaId
                msg.quoted.chat = msg.msg.contextInfo.remoteJid || msg.chat
                msg.quoted.isBaileys = msg.quoted.id ? msg.quoted.id.startsWith('BAE5') && msg.quoted.id.length === 16 : false
                msg.quoted.sender = client.decodeJid(msg.msg.contextInfo.participant)
                msg.quoted.fromMe = msg.quoted.sender === (client.user && client.user.id)
                msg.quoted.text = msg.quoted.text || msg.quoted.caption || msg.quoted.conversation || msg.quoted.contentText || msg.quoted.selectedDisplayText || msg.quoted.title || ''
                msg.quoted.mentionedJid = msg.msg.contextInfo ? msg.msg.contextInfo.mentionedJid : []
            }
        }
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//  
       msg.reply = async (teks) => {
        client.sendMessage(from, {
            text: teks,
            mentions: [msg.sender]
        }, {
            quoted: msg
        })
    }
    
    msg.getGroupMembers = function(participants) {
        let adminz = []
        for (let i of participants) {
            i.id !== null ? adminz.push(i.id) : ''
        }
        return adminz
    }
    msg.getGroupAdmins = function(participants) {
        let admins = []
        for (let i of participants) {
            i.admin !== null ? admins.push(i.id) : ''
        }
        return admins
    }

    msg.fkontak = (from) => { 
      let xfkontak = { key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { "contactMessage":{"displayName": SETTING["botName"],"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:2;rifza;;;\nFN:rifza\nitem1.TEL;waid=00000:00000\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}}
      return xfkontak
    }
  
    msg.speech = async (id, teks, teks2) => { //original function by @rifza.p.p		
        let { default:gtt } = await r('../worker/engine/gtts.js')
        let gttsp = gtt(teks)
        let heh = teks2
        let ranm = getRandom('.mp3')
        let rano = getRandom('.ogg')
        gttsp.save(ranm, heh, function() {
            exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
                fs.unlinkSync(ranm)
                let buff = fs.readFileSync(rano)
                let aud = {
                    audio: buff,
                    ptt: true,
                    mimetype: 'audio/mp4',
                    duration: 32668,
                    contextInfo: {
                        externalAdReply: {
                            title: time,
                            body: `${msg.sayingtime + msg.timoji + ' ' + msg.pushName}`,
                            thumbnail: thumb,
                            sourceUrl: "https://instagram.com/rifza.p.p",
                            mediaUrl: "https://instagram.com/rifza.p.p",
                            //renderLargerThumbnail: true,
                            //showAdAttribution: true,
                            mediaType: 1
                        }
                    }
                }
                client.sendMessage(id, aud, {
                    quoted: msg
                })
                fs.unlinkSync(rano)
            })
        })
    }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
  const times = moment().tz('Asia/Jakarta').format('HH:mm:ss')
      
  if(times < "23:59:00"){
    msg.sayingtime = 'Good night'
    msg.timoji = '🌃'}
  if(times < "19:00:00"){
    msg.sayingtime  = 'Good night'
    msg.timoji = '🏙️'}
  if(times < "18:00:00"){
    msg.sayingtime = 'Good afternoon'
    msg.timoji = '🌇'}
  if(times < "15:00:00"){
    msg.sayingtime = 'Good afternoon'
    msg.timoji = '🌞'}
  if(times < "11:00:00"){
    msg.sayingtime = 'Good morning'
    msg.timoji = '🌅'}
  if(times < "05:00:00"){
    msg.sayingtime = 'Good night'
    msg.timoji = '🌃' }      
        
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//   
    client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        let trueFileName;
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
    client.downloadMediaMessage = async (message, MessageType) => {
        const stream = await downloadContentFromMessage(message, MessageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                   
     client.editMessage = async(idmsg, keymsg, editedmsg) => {
         let prex = generateWAMessageFromContent(idmsg, proto.Message.fromObject(
        {
          "editedMessage":
          {
            "message":
            {
                "protocolMessage":{
                 "key":{
                  "remoteJid":idmsg,
                  "fromMe":true,
                  "id":keymsg
                 },
                  "type":"MESSAGE_EDIT",
                  "editedMessage":{
                  "conversation": editedmsg
                  }
              }
            }
          }
        }),
        {
          userJid: idmsg,
          quoted: msg
        })
        client.relayMessage(idmsg, prex.message,
        {
          messageId: prex.key.id
        })
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                   
    client.generateProfilePicture = async (buffer) => {
        const jimpread = await jimp.read(buffer);
        const result = jimpread.getWidth() > jimpread.getHeight() ? jimpread.resize(550, jimp.AUTO) : jimpread.resize(jimp.AUTO, 650)
        let jump = await jimp.read(await result.getBufferAsync(jimp.MIME_JPEG));
        return {
            bufferzzz: await result.getBufferAsync(jimp.MIME_JPEG)
        }
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                                          

    client.parseMention = async (text) => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                                         
    client.d = async(from, id, qu, y)=> {client.sendMessage(from, { delete: { remoteJid: from, fromMe: y, id: id, participant: qu } })}
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                                         


}

function r(_) { return import(_) }
watch(__filename, async() => {
    const timestamp = new Date().getTime();
  	console.log(chalk.yellow(`New ${__filename}`))
})