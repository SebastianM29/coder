import express from 'express'
import { ProductManager } from '../entregable2/productManager.js'
const app = express()

const prod = new ProductManager('../entregable2/productos')
const respProducts = prod.getProducts()
const respProductsParse = JSON.parse(respProducts)



app.use(express.urlencoded({extended:true}))


app.get('/products', function (req, res) {
    
    const {limit} = req.query
    if (!limit ){ 
        return res.json(respProductsParse)
    }
    
    const limitResp = respProductsParse.slice(0,limit)
    return res.json(limitResp)
    
    
    
})

app.get('/products/:pid', function (req, res) {
   
    const id = parseInt(req.params.pid)
    const findId = respProductsParse.find(element => element.id === id)
   if (findId) {
    
       console.log('este es el id',findId)
      return res.json(findId)
   }
   return res.send('no existe id')
})

app.listen(4000,()=> {
    console.log('escuchando en el puerto 4000 ')
})
