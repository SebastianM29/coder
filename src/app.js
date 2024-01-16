import express from 'express'
import { ProductManager } from '../entregable2/productManager.js'
const app = express()

const prod = new ProductManager('../entregable2/productos')





app.use(express.urlencoded({extended:true}))


app.get('/products', async (req, res) => {
    try {
        
        const respProducts = await prod.getProducts()
        console.log(respProducts)
       
        const {limit} = req.query
        if (!limit ){ 
            return res.json(respProducts)
        }
        
        const limitResp = respProducts.slice(0,limit)
    
        return res.json({
            limite:limit,
            datos:limitResp
            })
        
    } catch (error) {
        console.log('error')
        throw error
    }
    
    
})

app.get('/products/:pid', async (req, res) => {
    try {
        
        const respProducts = await prod.getProducts()
        
           const id = parseInt(req.params.pid)
          const findId = respProducts.find(element => element.id === id)
         if (findId) {
           
              console.log('este es el id',findId)
              return res.json(findId)
           }
           return res.send('no existe id')
    } catch (error) {
        throw error
    }
    
})

app.listen(5000,()=> {
    console.log('escuchando en el puerto 5000 ')
})
