import express from 'express'



export class Server {
    constructor(){
        this.app = express()

    }



    port() {
        this.app.listen(3000,()=>{
            console.log('corriendo en el puerto 3000')
        })
    }
    routes(){
        this.app.use()
    }

}