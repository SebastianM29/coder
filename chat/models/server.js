import express from "express";
import  path, { dirname }  from "path";
// import userRouter from "../routes/users.router.js";
import { fileURLToPath } from "url";
import handlebars from "express-handlebars";
import * as http from "http"
import { Server as SocketIOServer } from "socket.io";
// import { socketsController } from "../sockets/socketsControlllers.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
 //dirname es una función que toma una ruta de archivo y devuelve la ruta del directorio padre.
 //import.meta.url proporciona la URL del módulo actual en formato de URL. -- fileURLToPath es una función que convierte una URL en formato de URL a una ruta de sistema de archivos.


 export class Server {
     constructor() {
         this.app = express()
         //con websockets este el server que se debe conectar (this.server)
         //creo entonces un servidor http , y paso mi express para mnanejar las solicitudes en http
         this.server = http.createServer(this.app)
         //toda la info de los clientes conectados, ahora se importa Server/antes era io q se utilizaba
         this.io = new SocketIOServer(this.server)
         
         this.middlewares()
         this.routes()
        //  this.sockets()
         
        }
        
        middlewares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))

        this.app.use(express.static(path.join(__dirname,'../public')))

        this.app.engine('handlebars',handlebars.engine())
        this.app.set('views',path.resolve(__dirname,'../views'))
        this.app.set('view engine','handlebars')

    }

    routes(){
    // this.app.use('/', require( "../routes/pets.router.js") )-usando el import el require no-
    //this.app.use('/', userRouter )

    }  
    //referencia a nuestro servidor de sockets
    // sockets(){
    //     this.io.on('connection', socketsController )
      
    // }
    
    listen(){
        this.server.listen(3500,()=>{
            console.log('escuchando puerto 3500')
        })
    }

}