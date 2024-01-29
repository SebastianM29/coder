import { Router } from "express";
import { ProductService } from "../models/productService.js";
const router = Router()

const producto =  new ProductService('./db')



router.get('/',async(req,res)=>{

    const resp = await producto.getProducts()
    console.log('base',resp)
  
    res.render('home',{resp})
})


router.get('/realtimeproducts',(req,res)=>{

    let nombre= 'Productos a agregar'
  
    res.render('realTimeProducts',{nombre})
})











export default router
// module.exports = router
