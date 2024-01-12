import express from 'express'
import { ProductManager } from '../entregable2/productManager.js'
const app = express()




app.use(express.urlencoded({extended:true}))


app.get('/products', function (req, res) {
   
    const prod = new ProductManager('../entregable2/productos')
    const respProducts = prod.getProducts()
    const respProductsParse = JSON.parse(respProducts)
    const {limit} = req.query
    if (!limit ){ 
     return res.json(respProductsParse)
    }

    const limitResp = respProductsParse.slice(0,limit)
    return res.json(limitResp)
    
    
    
})


app.listen(4000,()=> {
    console.log('escuchando en el puerto 4000 ')
})
