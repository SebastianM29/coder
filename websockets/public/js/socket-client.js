const productoIngresado = document.getElementById('productoIngresado')
const socket = io()


document.getElementById('products').addEventListener('submit',(event)=>{
 event.preventDefault()
 const product = document.getElementById('producto').value
 console.log('envio esto al server',product)
 socket.emit('send-product',product)
})

socket.on('enviando-mensaje',(payload)=>{
    productoIngresado.innerHTML = '';
    console.log('escuchando conexion en el frontend',payload)
    productoIngresado.innerHTML += '';
    payload.forEach(element => {
      
        productoIngresado.innerHTML+= `
        <div id='${element.id}' class="product-item">
            <p>${element.name}</p>
            
            <button class = "btn btn-danger rounded-0" onclick="eliminarProducto('${element.id}')">Eliminar</button>
        </div>`;
    });
    console.log(productoIngresado)
})

const eliminarProducto= (id) => {
    console.log(id)
    socket.emit('enviodatos:cliente',id)
    const prodEliminar = document.getElementById(id)
    prodEliminar.remove()
}