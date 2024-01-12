import crypto from 'crypto'
import fs from 'fs'


/**Creamos una clase useManager que permite guardar usuarios en un archivo, El usuario
 * se recibira con una contraseña en string plano, y se debera guardar la contraseña
 * hasheada con crypto.Utilizar los modulos nativos fs y crypto.
 * el manager debe contar con los siguientes metodos.
 * metodo CrearUsuario debe recibir un objetos con los campos:
 * nombre
 * apellido
 * nombre de usuario
 * contraseña
 * El metodo debe guardar un usuario en un archivo Usuarios.json recordando
 * que la contraseña debe estar hasheada por su seguridad.
 * el metodo validar usuario recibira el nombre de usuario que quiero validar,
 * seguido de la contraseña,debe poder leer el json previamente generado con el
 * arreglo de usuarios y hacer la comparacion de contraseñas,si coinciden el usuario 
 * y la contraseña,devolver un mensaje "logueado",
 * caso contrario indicar error si el usuario no existe o si la contraseña 
 * es incorrecta
 */

class UseManager {
    constructor(){
    
    }
    async crearUsuario({nombre,apellido,nombreUsuario,contrasenia}){
        try {
            
            let dataParse
            const existFiles = fs.existsSync('./usuarios.json')

            if (existFiles) {
              
                const data = await fs.promises.readFile('./usuarios.json','utf-8')
    
                dataParse = JSON.parse(data)
                
            }else{
               
                dataParse= []
               
            }
            
            const contraseniaString = JSON.stringify(contrasenia)
            const hash = crypto.createHash('sha256').update(contraseniaString).digest('hex')
    
            const usuarioCreado = {
                nombre,
                apellido,
                nombreUsuario,
                pass:hash
            }
            dataParse.push(usuarioCreado)
            const dataParseStringify = JSON.stringify(dataParse)
            await fs.promises.writeFile('./usuarios.json',dataParseStringify) 
            return ('usuario creado correctamente')
           
            
        } catch (error) {
            console.log('error a la hora de crear un usuario')
            throw error
        }
    }
    async validarUsuario ({nombreUsuario,contrasenia}) {
         try {
            const search = await fs.promises.readFile('./usuarios.json','utf8')
            const searchParse = JSON.parse(search)
            const contraseniaString = JSON.stringify(contrasenia)
            const validatePass = crypto.createHash('sha256').update(contraseniaString).digest('hex')
           
            for (const iterator of searchParse) {
              
               

                if (validatePass === iterator.pass && nombreUsuario === iterator.nombreUsuario  ) {
                    return 'acceso otorgado'
                }
                
            }

          return 'acceso denegado'

         } catch (error) {

            console.log(error)
            throw error
            
         }
    }
}


const newUsuario = {
    nombre:'sebastian',
    apellido:'monzon',
    nombreUsuario:'sebastianete',
    contrasenia:123456
}
const newUsuario2 = {
    nombre:'martin',
    apellido:'albarado',
    nombreUsuario:'maru',
    contrasenia:292929
}

const newUsuario3 = {
    nombre:'yanel',
    apellido:'perez',
    nombreUsuario:'yan',
    contrasenia:234567
}
const newUsuario4 = {
    nombre:'gon',
    apellido:'albornoz',
    nombreUsuario:'gon',
    contrasenia:202020
}

const validando={
    nombreUsuario:'sebastianete',
    contrasenia:123456
}

const usuario = new UseManager()


// usuario.crearUsuario(newUsuario)
// usuario.crearUsuario(newUsuario2)



const validarUser = async() => {

    try {
        const nuevoUsuario = await usuario.crearUsuario(newUsuario4)
        const respuesta = await usuario.validarUsuario(validando)
        console.log(nuevoUsuario)
        console.log(respuesta)
    } catch (error) {
        console.log(error)
    }

}

validarUser()