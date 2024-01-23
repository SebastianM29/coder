import { Router } from "express";
import { ProductService } from "../models/productService.js";
const router = Router()

const productHandler = new ProductService('./productos')

router.get('/api/products',async(req,res)=>{
    try {
        const {limit} = req.query
        const respProducts = await productHandler.getProducts(limit)
        
        console.log(respProducts)
    
        return res.json(respProducts)
        
    } catch (error) {
        console.log('error')
        throw error
    }
})


router.get('/api/products/:id',async(req,res)=>{
    try {
    
        const parseIntId = parseInt(req.params.id)
        const resp = await productHandler.getProductById(parseIntId)
        return res.json(resp)
        

        
    } catch (error) {
        console.log('error')
        throw error
    }
})


router.post('/api/products',async(req,res)=>{
    try {
       const products = req.body
       const resp = await productHandler.addProduct(products)
       console.log(resp)
       return res.json(resp)
        
    } catch (error) {
        throw new Error
    }

})

router.put('/api/products/:id',async(req,res)=>{
    try {
      const parseId = parseInt(req.params.id) 
      const infoPut = req.body
      const resp = await productHandler.updateProducts(parseId,infoPut)
      return res.json(resp)  
    } catch (error) {
        throw new Error
    }

})


router.delete('/api/products/:id',async(req,res)=>{
    try {
      const parseId = parseInt(req.params.id) 
      
      const resp = await productHandler.deleteProducts(parseId)
      return res.json(resp)  
    } catch (error) {
        throw new Error
    }

})






export default router
// module.exports = router  -common js-