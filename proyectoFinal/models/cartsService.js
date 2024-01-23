
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
                 id:'',
                 quantity: 0
            }
            console.log('recibiendo producto',productId,'recibiendo id',cartId)
            const carts = await fs.promises.readFile(`${this.path}.json`,'utf-8')
            const cartsParse = JSON.parse(carts)
            const findCarts = cartsParse.findIndex(element => element.id === cartId)
            


            if (findCarts !== -1) {
                  console.log('algo')
                  
                  
                  const products = await fs.promises.readFile(`./productos.json`,'utf-8')
                  const productsParse= JSON.parse(products)
                  const findProductsById = productsParse.find(element => element.id === productId)
                  const cartIndexFind = cartsParse[findCarts].products.findIndex(products => products.id === productId)
                  console.log('este id?',cartIndexFind)
              
                  if (findProductsById) {
                      
                      if (cartIndexFind !== -1) {
                        console.log('entrando si son id iguales del carts')
                        console.log(cartsParse[findCarts].products[cartIndexFind].quantity)

                        cartsParse[findCarts].products[cartIndexFind].quantity++
              

                        
                      }else{
                      productIdAndQuantity.id = productId;
                      productIdAndQuantity.quantity = 1
                      cartsParse[findCarts].products.push(productIdAndQuantity)
                      }
                    
                      const cartsParseStringify = JSON.stringify(cartsParse,null,3)
                      await fs.promises.writeFile(`${this.path}.json`,cartsParseStringify)


                     


                      return {
                        msg: 'producto id agregado',
                        cart : cartsParse
                      }
                    }else{
                     
                      return 'producto no encontrado por id'

                    } 


              }else{
      
                  console.log('no hay nada')
                  return 'no se encuentra ninguno carts'
      
              } 
      
      
      
      
          
        } catch (error) {
            
        }


    }
}