const fs = require('fs')

// class ProductManager{
//     constructor(){
//       this.products = []   
//     }
    

//     getProducts(){
//         return this.products
//     }
    
    
//     addProduct(obj){
     
//       let missing =[]
    
//         const newProduct = {
//         id: this.products.length + 1,
//         title:obj.title,
//         description:obj.description,
//         price:obj.price,
//         thumbnail:obj.thumbnail,
//         code:obj.code,
//         stock:obj.stock
//       }
    
//          for (const iterator of this.products) {
     
//             if (iterator.code === obj.code) {
//             return `codigo repetido ${obj.code} para el producto ${obj.title}`
//            }
//           }
        
    
//         Object.entries(newProduct).forEach(([key,value]) => {
//            if (value===undefined) {
//             missing.push(key)
//           }
        
//         });
//         if (missing.length > 0) {
//           return `falta este campo ${missing}`
//         }
//         this.products.push(newProduct)
//         return`agregado exitosamente: ${obj.description}, ${obj.title}`
    
//     }
//     getProductById(uid){
//        const found = this.products.find( (numId)=> { return numId.id === uid})
//       if (found) {
//         return found
    
//       }else{
//         return 'not found'
//       }
       
//     }
//     }
//     const objeto1 = {
//         title:'terrabusi',
//         description:'masitas',
//         price:299,
//         thumbnail:'/masitas',
//         code: ' ',
//         stock:2

//     }
    
    
//     const producto =new ProductManager()
//     console.log(producto.addProduct(objeto1))
//     console.log(producto.getProducts())
 

//**Hands on lab */

class ManagerUsuarios {
  constructor(){
      this.usuarios = []

  }

  async crearUsuario(obj){
   
   this.usuarios.push(obj)
   console.log(this.usuarios)
   const archivoGuardado = JSON.stringify(this.usuarios)
   await fs.promises.writeFile('./ManagerUsuarios.txt',archivoGuardado)
  }

  async consultarUsuario(){
   const datos = await fs.promises.readFile('./ManagerUsuarios.txt','utf-8')
   console.log('datos sin parse',datos)
   const datosExtraidos = JSON.parse(datos)
   console.log('datos extraidos',datosExtraidos)

  }


}
const enviarUsuario = {
  nombre: "sebastian",
  apellido:"monzon",
  edad:"42",
  curso:"backend"

}
const enviarUsuario2 = {
  nombre: "sebastian",
  apellido:"monzon",
  edad:"42",
  curso:"backend"

}
const enviarUsuario3 = {
  nombre: "Juaanito",
  apellido:"monzon",
  edad:"42",
  curso:"backend"

}
const manager = new ManagerUsuarios()
manager.crearUsuario(enviarUsuario)
manager.crearUsuario(enviarUsuario2)
manager.crearUsuario(enviarUsuario3)

manager.consultarUsuario()
