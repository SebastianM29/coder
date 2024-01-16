import fs  from 'fs'




export class ProductManager {
    
    constructor(path){
        this.products = []
        this.path=path
      
    }
     /**corregido */
    async getProducts(){
        try {
            await fs.promises.access(`${this.path}.txt`, fs.constants.F_OK)
            const data =  JSON.parse(fs.readFileSync(`${this.path}.txt`,'utf-8'))
            return data
            
        } catch (error) {
            
            return 'Sin Datos en el archivo'
        }
        
        
    }
    /**corregido */
    async addProduct(obj){
        try {
            
            let newValue = 0
            let dataParse

                try {
                await fs.promises.access(`${this.path}.txt`)
                console.log('hay dato')
                const data = await fs.promises.readFile(`${this.path}.txt`,'utf-8')
                dataParse = JSON.parse(data)
                console.log(data)
                    
                } catch (error) {
                    dataParse= []
                    console.log(' no hay dato')      
                }
                
        
            for (const values of dataParse) {
                      if (values.id > newValue) {
                      newValue = values.id
                }
                
            }

            let newProduct={
            
                id: newValue += 1,
                title:obj.title,
                description:obj.description,
                price:obj.price,
                thumbnail:obj.thumbnail,
                code:obj.code,
                stock:obj.stock
            }
            
            for (const values of dataParse) {
                if (values.code === obj.code) {
                    return (`Codigo repetido:${obj.description}:Codigo ${obj.code}`)
                }
                
            }
            

            
            const algo = Object.entries(newProduct)
            .filter(([key,value])=>!value)
            .map(([key,value])=>key)
            
            if (algo.length > 0) {
                return (`estos campos deben venir : ${algo}`)
            }else{
                dataParse.push(newProduct)
                const productsArrayStrings = JSON.stringify(dataParse,null,2)
                await  fs.promises.writeFile(`${this.path}.txt`,productsArrayStrings)
                return {
                    msg:'Agregado exitosamente',
                    obj: newProduct  
                }
            }
        } catch (error) {
                throw error
        }
            
        }
        async deleteProducts(id){
        const data = fs.promises.readFile(`${this.path}.txt`,'utf-8')
        let dataParse = JSON.parse(data)
        console.log('esto se deberiaver',dataParse)
        
        for (const iterator of dataParse) {
                console.log('este es el iterator', iterator.id)
            if (iterator.id === id) {
                
                const find = dataParse.find((value)  => value.id === id)
                const deleteSuccess = dataParse.filter(value => value.id !== id)
                console.log('el que deberia eliminar',find)
                dataParse = deleteSuccess
                const productsArrayStrings = JSON.stringify(dataParse,null,2)
                await fs.promises.writeFile(`${this.path}.txt`,productsArrayStrings)
    
                return {msg:'producto borrado',
                        producto: find
                    }
                
            }
            
            
            
        }
        return `El id no es valido:${id}`
        
        }


      /**corregido */

       async getProductById(id) {
        try {
            
            const data =await fs.promises.readFile(`${this.path}.txt`,'utf-8')
            const dataParse = JSON.parse(data)
            const findId = dataParse.find((element) => element.id === id)
          
            return  findId ? findId 
             : `id numero:${id}, no existente`
        } catch (error) {
            throw error
        }
    }

    /**corregido */

      async updateProducts(update){
        let oldValue
        const data =await fs.promises.readFile(`${this.path}.txt`,'utf-8')
        const dataParse = JSON.parse(data)
        
        const findUpdate = dataParse.find((element) => element.id === update.id)
        if (!findUpdate) {
            return 'no se encontro ningun id'
        }
        oldValue={...findUpdate}

        const findUp = Object.keys(findUpdate).filter((key)=> key === update.fieldUpdate)
        if (findUp.length === 0) {
           return {msg:'el campo debe existir, no se puede crear uno',
                   type:update.fieldUpdate}
        }
        
        const newUpdate = dataParse.map((element)=>{
            if (element.id === update.id){
                element[update.fieldUpdate] = update.newValue
                console.log(element)
            }
            return element
        })
        const  newUpdateString = JSON.stringify(newUpdate,null,3)
        await fs.promises.writeFile(`${this.path}.txt`,newUpdateString)
        
        return {
            producto:oldValue,
            productoActualizado:findUpdate
        }
    }
}


const objeto2 = {
            title:'stanley',
            description:'termo',
            price:299,
            thumbnail:'/bazar',
            code: 345,
            stock:2
    
         }
const objeto1 = {
            title:'suipachense',
            description:'yogurt',
            price:299,
            thumbnail:'/lacteo',
            code:9853,
            stock:2
    
         }
const objeto3 = {
            title:'detergente',
            description:'ala',
            price:2999,
            thumbnail:'/limpieza',
            code: 9002,
            stock:243232
    
        }

        const prodNuevo = {
            title:'lacoste',
            description:'remera',
            price:2999,
            thumbnail:'/vestimenta',
            code: 92234,
            stock:248882
    
        }


const upd = {
    id:4,
    fieldUpdate:'description',
    newValue:'colores blancos'
}

const manager = new ProductManager('./productos')
//  console.log(manager.addProduct(objeto1))
// console.log(manager.addProduct(objeto2))
// console.log(manager.addProduct(objeto3))
// console.log(manager.getProducts()) 


//  console.log(manager.deleteProducts(2))

// console.log(manager.getProductById(2))
// console.log(manager.updateProducts(upd))

// const llamandoF = async() => {
//     try {
//        const newObject = await manager.updateProducts(upd)
//        console.log(newObject)
//        return newObject
//     } catch (error) {
//         throw error
//     }
// }

// llamandoF()

