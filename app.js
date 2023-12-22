

class ProductManager{
    constructor(){
      this.products = []   
    }
    
    getProducts(){
        return this.products
    }
    
    
    addProduct(obj){
     
      let missing =[]
    
        const newProduct = {
        id: this.products.length + 1,
        title:obj.title,
        description:obj.description,
        price:obj.price,
        thumbnail:obj.thumbnail,
        code:obj.code,
        stock:obj.stock
      }
    
         for (const iterator of this.products) {
     
            if (iterator.code === obj.code) {
            return `codigo repetido ${obj.code} para el producto ${obj.title}`
           }
          }
        
    
        Object.entries(newProduct).forEach(([key,value]) => {
           if (value===undefined) {
            missing.push(key)
          }
        
        });
        if (missing.length > 0) {
          return `falta este campo ${missing}`
        }
        this.products.push(newProduct)
        return`agregado exitosamente: ${obj.description}, ${obj.title}`
    
    }
    getProductById(uid){
       const found = this.products.find( (numId)=> { return numId.id === uid})
      if (found) {
        return found
    
      }else{
        return 'not found'
      }
       
    }
    }
    
    
    
    