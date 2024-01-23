import { Router } from "express";
import { CartService } from "../models/cartsService.js";
const router = Router()

const cartHandler =  new CartService('./carts')

router.get('/api/carts/:cid',async(req,res)=>{
    try {
        
        const idCarts = parseInt(req.params.cid)
        const resp = await cartHandler.cartsById(idCarts)

        return res.json(resp)

        
    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
            error: "Error interno al intentar acceder al id del carrito"
        });
    }
})


router.post('/api/carts',async(req,res)=>{
    try {
        const resp = await CartService.addCart('./carts')
        return res.json({
          msg:'carro creado',
          resp
        })
        
    } catch (error) {

        return res.status(500).json({
        error: "Error interno al crear el carrito"
        });
        
    }
})

router.post('/api/carts/:cid/products/:pid',async(req,res)=>{
    try {
        const cartId = parseInt(req.params.cid)
        const prodId = parseInt(req.params.pid)
        const resp = await cartHandler.addProductCart(prodId,cartId)
        return res.json(resp)
        
    } catch (error) {
    
        throw error
    
    }
})

export default router
// module.exports = router
