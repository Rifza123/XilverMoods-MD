const { default:SETTING } = await r('../../validator/config.js')
const modul = SETTING['modul']
const axios = modul['axios'];
const cheerio = modul['cheerio'];

export const mediafireDl = async (url) => {
const res = await axios.get(url) 
const $ = cheerio.load(res.data)
const hasil = {}
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
const seplit = link.split('/')
const nama = seplit[5]
let mime;
mime = nama.split('.')
mime = mime[1]
hasil.title = nama 
hasil.size = size
hasil.link = link
return hasil
}

function r(_) { return import(_) }
