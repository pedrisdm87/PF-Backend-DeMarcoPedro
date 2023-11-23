import bcrypt from 'bcrypt'

//helper function --> esta es la que combierte la contraseña en otro texto (hash) 
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(15))

//helper function---> esta sirve para loguear una usuario... compara la contraseña
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

export default function generarCodigo(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
  
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indice);
    }
  
    return codigo;
  }
  
  
  

  