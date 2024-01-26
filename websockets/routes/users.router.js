import { Router } from "express";
const router = Router()



router.get('/',(req,res)=>{

    let nombre= 'sebastian llegando'
  
    res.render('home',{nombre})
})


router.get('/realtimeproducts',(req,res)=>{

    let nombre= 'Productos a agregar'
  
    res.render('realTimeProducts',{nombre})
})











export default router
// module.exports = router
