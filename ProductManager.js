import fs  from 'fs'




class ProductManager {
    
    constructor(path){
        this.products = []
        this.path=path
      
    }
    getProducts(){
        const existFiles = fs.existsSync(`${this.path}.txt`)
        if (existFiles) {
            const data =  fs.readFileSync(`${this.path}.txt`,'utf-8')
            return data
        }else {
            return 'Sin Datos en el archivo'
        }
    }
    addProduct(obj){
       
            let newValue = 0
            const existFiles = fs.existsSync(`${this.path}.txt`)
             let dataParse

            if (existFiles) {
                console.log('hay dato')
                const data =  fs.readFileSync(`${this.path}.txt`,'utf-8')
    
                dataParse = JSON.parse(data)
                
            }else{
               
                dataParse= []
               
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
                fs.writeFileSync(`${this.path}.txt`,productsArrayStrings)
                return 'agregado exitosamente'
            }
         
        }
        deleteProducts(id){
        const data = fs.readFileSync(`${this.path}.txt`,'utf-8')
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
                fs.writeFileSync(`${this.path}.txt`,productsArrayStrings)
    
                return {msg:'producto borrado',
                        producto: find
                    }
                
            }
            
            
            
        }
        return `El id no es valido:${id}`
        
        }




       getProductById(id) {
       const data = fs.readFileSync(`${this.path}.txt`,'utf-8')
       const dataParse = JSON.parse(data)
       const findId = dataParse.find((element) => element.id === id)
     
       return  findId ?{
        msg:'producto encontrado',
        id:id,
        producto:findId} 
        : `id numero:${id}, no existente`
      }


      updateProducts(update){
        const data = fs.readFileSync(`${this.path}.txt`,'utf-8')
        const dataParse = JSON.parse(data)
        
        const findUpdate = dataParse.find((element) => element.id === update.id)
        if (!findUpdate) {
            return 'no se encontro ningun id'
        }

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
        fs.writeFileSync(`${this.path}.txt`,newUpdateString)
        
        return 'actualizado correctamente'
    }
}


const objeto2 = {
            title:'terrabusi',
            description:'masitas',
            price:299,
            thumbnail:'/masitas',
            code: 151262592,
            stock:2
    
         }
const objeto1 = {
            title:'Don Satur',
            description:'Pan dulce',
            price:299,
            thumbnail:'/panificado',
            code: 12453,
            stock:2
    
         }
const objeto3 = {
            title:'Pitusas',
            description:'galletitas',
            price:2999,
            thumbnail:'/masas',
            code: 163332,
            stock:243232
    
        }

const upd = {
    id:2,
    fieldUpdate:'stock',
    newValue:30000
}

const manager = new ProductManager('./productos')
//  console.log(manager.addProduct(objeto1))
// console.log(manager.addProduct(objeto2))
// console.log(manager.addProduct(objeto1))
// console.log(manager.getProducts()) 


 console.log(manager.deleteProducts(2))

// console.log(manager.getProductById(2))
// console.log(manager.updateProducts(upd))