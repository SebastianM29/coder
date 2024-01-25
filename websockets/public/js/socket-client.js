

const socket = io()


document.getElementById('products').addEventListener('submit',(event)=>{
 event.preventDefault()
 const product = document.getElementById('producto').value
 console.log('envio esto al server',product)
 socket.emit('send-product',product)
})

socket.on('enviando-mensaje',(payload)=>{
    console.log('escuchando conexion en el frontend',payload)
})