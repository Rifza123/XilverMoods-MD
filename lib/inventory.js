import fs from 'fs';
import SET from '../validator/config.js';
import { role } from './level.js';

let _inventory = JSON.parse(fs.readFileSync('./lib/container/database/inventory.json'));

  //inventory
  export const addInventory = (sender) => {
        const obj = {
          id: sender, 
          exp: SET["expawal"],
          coin: SET['coinawal'],
          darah: SET['darahawal'],
          besi: SET['besiawal'],
          emas: SET['emasawal'],
          emerald: SET['emeraldawal'],
          umpan: SET['umpanawal'],
          potion: SET['potionawal'],
          ikan: 0,
          ayam: 0, 
          kelinci: 0, 
          domba: 0, 
          sapi: 0, 
          gajah: 0
        }
         _inventory.push(obj)
        fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
   }
  export const checkInventory = (sender) => {
            let status = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        
  export const getInventory = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            return _inventory[position]
        }
            
  export const addCoin = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].coin += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const kurangCoin = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].coin -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const getCoin = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].coin
            }
        }  
           //
           
export const addExp = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].exp += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
        
   export const kurangExp = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].exp -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const getExp = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].exp
            }
        } 
   export const getRole = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                let exp = _inventory[position].exp
                return role(exp)
                
            }
        } 
                                        
   export const addDarah = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].darah += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const kurangDarah = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].darah -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const getDarah = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].darah
            }
        }     
  export const addBesi = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].besi += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const kurangBesi = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].besi -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const getBesi = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].besi
            }
        } 
  export const addEmas = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].emas += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const kurangEmas = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].emas -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const getEmas = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].emas
            }
        }     
   export const addEmerald = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].emerald += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const kurangEmerald = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].emerald -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const getEmerald = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].emerald
            }
        }     
   export const addUmpan = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].umpan += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const kurangUmpan = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].umpan -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const getUmpan = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].umpan
            }
        }     
   export const addPotion = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].potion += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const kurangPotion = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].potion -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   export const getPotion = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].potion
            }
        }     
        
   export const addAyam = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].ayam += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const kurangAyam = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].ayam -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const getAyam = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].ayam
            }
        }    
  export const addIkan = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].ikan += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const kurangIkan = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].ikan -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const getIkan = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].ikan
            }
        }      
  export const addKelinci = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].kelinci += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const kurangKelinci = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].kelinci -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const getKelinci = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].kelinci
            }
        }     
  export const addDomba = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].domba += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const kurangDomba = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].domba -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const getDomba = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].domba
            }
        } 
    export const addSapi = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].sapi += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const kurangSapi = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].sapi -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const getSapi = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].sapi
            }
        }     
  export const addGajah = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].gajah += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const kurangGajah = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].gajah -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
        }
   export const getGajah = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].gajah
            }
        }     