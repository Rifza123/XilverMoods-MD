import axios from 'axios';

const reSize = async (buffer, ukur1, ukur2) => {
    try {
        const Jimp = require('jimp');
        const bu = await Jimp.read(buffer);
        const ab = await bu.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG);
        return ab;
    } catch (error) {
        console.log('Error resizing image:', error);
        return null;
    }
};

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const getBuffer = async (url, options) => {
    try {
        options = options || {};
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (error) {
        console.log(`Error fetching buffer: ${error}`);
        return 'err';
    }
};
const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 100000000000000000)}${ext}`
}
const fetchJson = async (url, options) => {
    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching JSON: ${error}`);
    }
};

const runtime = (seconds) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
};
String.prototype.toFormat = function(){ 
    const sizes = ['B', 'kB', 'MB', 'GB']
    const base = 1024
    const index = Math.floor(Math.log(this) / Math.log(base))
    const convertedSize = (this / Math.pow(base, index)).toFixed(2)
    return `${convertedSize}${sizes[index]}`
}
const query = function(url, params){
   const queryString = Object.keys(params).map(key => key + "=" + params[key]).join("&");
   return url + "?" + queryString;
}
export {
    getBuffer,
    getRandom,
    fetchJson,
    query,
    runtime,
    reSize,
    sleep
};
