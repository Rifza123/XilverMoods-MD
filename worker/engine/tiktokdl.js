/*
* SCRAPER BY RIFZA
   (clara sayangku><)
*/

const { default:SETTING } = await r('../../validator/config.js')
const modul = SETTING['modul']
const a = modul['axios'];
let c = modul["cheerio"]

async function getType(url){//@rifza.p.p
  return new Promise(async(resolve, reject) => {    
    a
    .get(url).then(z => {
      let a = z.request.res.responseUrl
       if(a.includes('/photo/')){
         resolve('image')
       } else {
         resolve('video')
       }
    })
  })
}

export const tiksave = async function(url){
  let res = {}
  res.type = await getType(url)
      
  let { data } = await a
  .request
    (
      "https://tiksave.io/api/ajaxSearch", 
      { 
        method: "POST",
        data: new URLSearchParams(
          Object.entries(
           { 
             q: url, 
             lang: "en"
           }
         )
        )
      }
    )
    const $ = c.load(data.data);
    
    let dlbutton = Array.from($('.tik-button-dl')).map((element) => {
       const url = $(element).attr('href');
       const text = $(element).text().trim(); // Dapatkan konten teks dari elemen <a>
       const description = text.replace(/\s+/g, ' ').trim(); // Hapus spasi ekstra
       return { description, url };
    });
    res.media = res.type == "image" ? $('.photo-list .download-box li').map((index, element) => {
      let url = $(element).find('.download-items__thumb img').attr('src');    
      return { url }
    }).get() : dlbutton
                   
    res.audio = res.type == "video" ? 
       { url: res.media[3].url }
      : { url: dlbutton[1].url }
   return res
}
function r(_) { return import(_) }
