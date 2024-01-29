import { ProductService } from "../models/productService.js"


const producto =  new ProductService('./db')


export const socketsController = (socket) => {
    console.log('Cliente conectado',socket.id)
    socket.on('disconnect', ()=> {
        console.log('Cliente desconectado', socket.id)
    })

    socket.on('send-product',async(payload)=>{
        console.log(' llego conexion al server',payload)
        const product = await producto.addProduct(payload)
        console.log('debo mandarte esto',product)
        socket.emit('enviando-mensaje',product)
    })

    socket.on('enviodatos:cliente',async(data) => {
        console.log('server',data)
        await producto.deleteProducts(data)
    })
}