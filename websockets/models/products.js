import fs from "fs";
import {v4 as uuid} from "uuid";

export class Product {
    
    constructor(path){
     this.path=path
     this.product={
        id:'',
        name:''
     }
     
    }
    async addProduct(prod){
        
        console.log('estos son los datos',prod)
          try {
              this.product.name = prod
              this.product.id=uuid()
              const datos= this.product
              console.log('estos son los datos',datos)
    
              return datos
            } catch (error) {
            
          }
    }

    async deleteProduct(id){
        try {
            await fs.promises.access(`${this.path}.json`)
            const resp = await fs.promises.readFile(`${this.path}.json`,'utf-8')
            const respParse =JSON.parse(resp)
            console.log('viendo id en delete',respParse)
        } catch (error) {
            console.log('no hay dato')
        }
    
    }


}

// const llamando = async() =>{
//     try {
//         console.log('andando')
//         const producto =  new Product('./productos')
//         const resp =  await producto.addProduct('pera')
//         console.log(resp)
//         return resp
//     } catch (error) {
        
//     }
// }

// llamando()