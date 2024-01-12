import express from 'express'
const app = express()




app.use(express.urlencoded({extended:true}))


app.get('/products', function (req, res) {
   
    
    
    console.log('hay algo?')
    
    res.send('probando')
    
})


app.listen(4000,()=> {
    console.log('escuchando en el puerto 4000 ')
})
