import express from "express";
import productRoutes from "../routes/product.router.js";
import cartsRoutes from "../routes/carts.router.js"



 //dirname es una función que toma una ruta de archivo y devuelve la ruta del directorio padre.
 //import.meta.url proporciona la URL del módulo actual en formato de URL. -- fileURLToPath es una función que convierte una URL en formato de URL a una ruta de sistema de archivos.



export class Server {
    constructor() {
        this.app = express()

        this.middlewares()
        this.routes()

    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
    }

    routes(){
    // this.app.use('/', require( "../routes/pets.router.js") )-usando el import el require no-
    this.app.use('/',productRoutes)
    this.app.use('/',cartsRoutes)
    }
    
    listen(){
        this.app.listen(3000,()=>{
            console.log('escuchando puerto 3000')
        })
    }

}