import bcrypt from "bcrypt";
import { fakerES as faker } from "@faker-js/faker";

//helper function --> esta es la que combierte la contraseña en otro texto (hash)
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(15));

//helper function---> esta sirve para loguear una usuario... compara la contraseña
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export default function generarCodigo(longitud) {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";

  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres.charAt(indice);
  }

  return codigo;
}

export const generateProducts = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 10, max: 150 }),
    code: faker.commerce.productAdjective(),
    category: faker.commerce.department(),
    stock: faker.number.int({ max: 100 }),
    thumbnail: faker.image.avatar({ height: 480, width: 640 }),
  };
};
