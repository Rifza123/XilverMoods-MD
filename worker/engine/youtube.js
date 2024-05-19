const { default:SETTING } = await r('../../validator/config.js')
const modul = SETTING['modul']
const axios = modul['axios'];
let baseUrl = "https://line.1010diy.com/"
let url = "https://"+String.fromCharCode(109, 112, 51, 45, 110, 111, 119)+".com"
/**==================================!
 ○ Create by @rifza.p.p
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
 !!!           DOKUMEN ASLI DARI RIFZA               !!!
 !!! pake aja tpi jan ganti nama gw sama tqto nya 😶 !!!
 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  🩵 Follow ️me on :
      ▪︎ https://youtube.com/@rifza  
      ▪︎ https://github.com/Rifza123
      ▪︎ https://instagram.com/rifza.p.p?igshid=ZGUzMzM3NWJiOQ==
      ▪︎ https://www.threads.net/@rifza.p.p

 ♡Thanks To :
      ▪︎ Clara
      ▪︎ Penyedia module
      ▪︎ Penyedia website
      ▪︎ Diri sendiri
      ▪︎ All     
                               
!===================================*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
export const youtubeSearch = async(query) => {
  return new Promise(async(resolve, reject) => {
  
  axios(baseUrl + "web/free-mp3-finder/query?",
    {
      method: "GET",
      params: {
        q: query,
        type: "youtube",
        pageToken: ""
      },
      headers: {
        "User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
      }          
    }
  ).then(({data})=> {
    resolve(data)
  })
  
})
}

export const youtubeDownload = async(type, id) => {
  return new Promise(async(resolve, reject) => {
     let { data } = await axios({
         url: url+"/api/ajax/search",
         method: "POST",
         data: new URLSearchParams(Object.entries({
             query: "https://www.youtube.com/watch?v="+id,
             v: type
         }))
     })
      let links = data.links[type]
      let link = Object.keys(links)
      let k = links[link[0]].k
      while (true) {
        try {
         let { data } = await axios({
            url: url+"/api/ajax/convert",
            method: "POST",
            data: new URLSearchParams(Object.entries({
               vid: id,
               k
            }))
         })
            if (data.c_status == "CONVERTED") {
              resolve({ status: true, url: data.dlink })
            break;
            } 
            if (data.c_status == "FAILED") {
              resolve({ status: false, url: null })
            break;
            } 
            
        } catch (error) {
          reject(error.message)
        }

       await new Promise(resolve => setTimeout(resolve, 1000));
      }

  })
}
function r(_) { return import(_) }


