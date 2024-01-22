
import  fs  from "fs";



export class CartService {
    constructor(path) {

        this.path=path

    }



    static async addCart(path){
        let newValue = 0
        let dataParse 

         try {
            try {
                await fs.promises.access(`${path}.json`, fs.constants.F_OK)
                const dat = await fs.promises.readFile(`${path}.json`,'utf-8')
                const data =JSON.parse(dat)
                console.log(typeof data)
                dataParse = data
            } catch (error) {
                
                console.log('no hay dato')
                dataParse=[]
                
            }
           
            for (const value of dataParse) {
                if (value.id > newValue) {
                    newValue = value.id
                }
                
            }

            let newCart = {
                id: newValue += 1,
                products : []
            }

            dataParse.push(newCart);
            const cartsArrayStrings = JSON.stringify(dataParse,null,2);
            await fs.promises.writeFile(`${path}.json`,cartsArrayStrings)
            return {
                msg:'carrito agregado',
                obj:dataParse
            }


         } catch (error) {

             console.log(error)
            throw error
            
         }

    }

    async cartsById (id) {
        try { 
            
            const cartsId = await fs.promises.readFile(`${this.path}.json`,'utf-8')
           
            const cartsIdParse = JSON.parse(cartsId)
            const findCartsId = cartsIdParse.find(element => element.id === id)
            console.log(findCartsId)

            return findCartsId ? findCartsId : `no existe el id: ${id}`
            
        } catch (error) {
            
            console.log(error)
            throw error
            
        }
      
    }

    async addProductCart (productId,cartId) {
        try {
            
             let productIdAndQuantity = {
             quantity: 0,
             id:''
            }
            console.log('recibiendo producto',productId,'recibiendo id',cartId)
            const carts = await fs.promises.readFile(`${this.path}.json`,'utf-8')
            const cartsParse = JSON.parse(carts)
            console.log(cartsParse)
            if (carts) {
              const findCarts = cartsParse.find(element => element.id === cartId)
              console.log(findCarts)
              if (findCarts) {
                  console.log('este es el carrtito', findCarts)
      
                  const products = await fs.promises.readFile(`./productos.json`,'utf-8')
                  const productsParse= JSON.parse(products)
                  const findProductsById = productsParse.find(element => element.id === productId)
                  if (findProductsById) {
                      productIdAndQuantity.id = productId;
                      productIdAndQuantity.quantity += 1
                      findCarts.products.push(productIdAndQuantity)
                      console.log('hay algo?',findCarts)
                      return {
                        msg: 'producto id agregado',
                        cart : findCarts
                      }
                  }else{
                     
                    return 'producto no encontrado'

                  }


              }else{
      
      
                  return 'no se encuentra ninguno con este id'
      
              } 
      
      
      
      
            }else{
              console.log( `no existe ningun carrito`)
              return `no existe ningun carrito`
            }
        } catch (error) {
            
        }


    }
}