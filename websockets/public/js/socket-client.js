const socket = io()

let products=[]
const productoIngresado = document.getElementById('productoIngresado')

document.addEventListener('DOMContentLoaded',()=>{

    console.log('me ejecuto antes y que ')
    const datProducts = localStorage.getItem('products')
    const datProductsParse =JSON.parse(datProducts)
    console.log(datProductsParse)
    datProductsParse.forEach((element)=>{
    productoIngresado.innerHTML +=    `
    <div id='${element.id}' class="product-item">
        <p>${element.name}</p>
        
        <button class = "btn btn-danger rounded-0" onclick="eliminarProducto('${element.id}')">Eliminar</button>
    </div>`
    })
   
})


document.getElementById('products').addEventListener('submit',(event)=>{
 event.preventDefault()
 const product = document.getElementById('producto').value
 console.log('envio esto al server',product)
 socket.emit('send-product',product)
})

socket.on('enviando-mensaje',(payload)=>{
    if (!localStorage.getItem('products')) {
        // Inicializar localStorage con un array vacío si no hay nada
        localStorage.setItem('products', JSON.stringify([]));
    }
     
   const value  = localStorage.getItem('products')
   const valueParse = JSON.parse(value)
   valueParse.push(payload)
   console.log(' agregando muichos',valueParse)
   localStorage.setItem('products', JSON.stringify(valueParse))

    


    productoIngresado.innerHTML += `
    <div id='${payload.id}' class="product-item">
        <p>${payload.name}</p>
        
        <button class = "btn btn-danger rounded-0" onclick="eliminarProducto('${payload.id}')">Eliminar</button>
    </div>`;
   
})

const eliminarProducto= (id) => {
    // console.log(id)
    // socket.emit('enviodatos:cliente',id)
    const prodEliminar = document.getElementById(id)
    prodEliminar.remove()
    console.log('este debo eliminar',id)
    const searchId = localStorage.getItem('products')
    const searchIdParse = JSON.parse(searchId);
    const filterId = searchIdParse.filter((element)=> element.id !== id)
    console.log('este seria',filterId)
    const filterIdString = JSON.stringify(filterId)
    localStorage.setItem('products',filterIdString)
}