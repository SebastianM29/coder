const productoIngresado = document.getElementById('productoIngresado')
const socket = io()
let find = []

document.addEventListener('DOMContentLoaded',()=>{
    const searchProducts = localStorage.getItem('productosGuardados')
    if (searchProducts) {
        console.log('hay productos',searchProducts)
        const searchProductsParse = JSON.parse(searchProducts)
        find = searchProductsParse
        console.log('veo correctamente',find)
       
        find.forEach((element) => {

            console.log('pasando por aca')
             productoIngresado.innerHTML += `
             <div id='${element.id}' class="product-item">
                 <div>${element.title}</div>
                 <div>${element.description}</div>
                 <div>${element.code}</div>
                 <div>${element.price}</div>
                 <div>${element.stock}</div>
                 <div>${element.category}</div>
                 <button class = "btn btn-danger rounded-0 mt-5" onclick="eliminarProducto('${element.id}')">Eliminar</button>
             </div>`;
    
        })
        




    }else{
    console.log('no hay productos')
    localStorage.setItem('productosGuardados',JSON.stringify(find))
    console.log('si no hay productos mostrar esto',[])
    }
})


document.getElementById('products').addEventListener('submit',(event)=>{
 event.preventDefault()
 
 const title = document.getElementById('title').value
 const description = document.getElementById('description').value
 const code = document.getElementById('code').value
 const price = document.getElementById('price').value
 const stock = document.getElementById('stock').value
 const category = document.getElementById('category').value

 const sendProduct = {
    title,
    description,
    code,
    price,
    stock,
    category
 }
 
 
 console.log('envio esto al server',sendProduct)
 socket.emit('send-product',sendProduct)
 


})

socket.on('enviando-mensaje',(payload)=>{


    // productoIngresado.innerHTML = '';
    if (payload.msg) {
         console.log('entro aca',payload.msg)
         productoIngresado.innerHTML += `<div class="alert" id='${payload.msg}'>${payload.msg}</div>`
         setTimeout(() => {
          const searDelete = document.getElementById(payload.msg) 
          searDelete.remove()  
         }, 3000);
        return
    }



    console.log('escuchando conexion en el frontend',payload)

    
     console.log(productoIngresado)
     find.push(payload)
     console.log('debo agregar ',find)
     payloadStringify = JSON.stringify(find)
     localStorage.setItem('productosGuardados',payloadStringify)
     productoIngresado.innerHTML=''
    
     find.forEach((element) => {
        console.log('pasando por aca')
         productoIngresado.innerHTML += `
         <div id='${element.id}' class="product-item">
             <div>${element.title}</div>
             <div>${element.description}</div>
             <div>${element.code}</div>
             <div>${element.price}</div>
             <div>${element.stock}</div>
             <div>${element.category}</div>
             <button class = "btn btn-danger rounded-0 mt-5" onclick="eliminarProducto('${payload.id}')">Eliminar</button>
         </div>`;

    })

    // productoIngresado.innerHTML += `
    //     <div id='${payload.id}' class="product-item">
    //         <div>${payload.title}</div>
    //         <div>${payload.description}</div>
    //         <div>${payload.code}</div>
    //         <div>${payload.price}</div>
    //         <div>${payload.stock}</div>
    //         <div>${payload.category}</div>
    //         <button class = "btn btn-danger rounded-0 mt-5" onclick="eliminarProducto('${payload.id}')">Eliminar</button>
    //     </div>`;
        
  

   
   
})

const eliminarProducto= (id) => {
    console.log('veo esto en el delete',id)
    socket.emit('enviodatos:cliente',id)
    const findProd = JSON.parse(localStorage.getItem('productosGuardados'));
    console.log('productos parseados', findProd)
    const filterFindProd = findProd.filter((prod) => prod.id !== id)
    console.log('deberia ver los productos filtrados',filterFindProd)
    localStorage.setItem('productosGuardados',JSON.stringify(filterFindProd))
    const prodEliminar = document.getElementById(id)
    prodEliminar.remove()
}