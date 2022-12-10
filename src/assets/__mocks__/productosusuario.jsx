import { v4 as uuid } from 'uuid';
import Api from "../services/Api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
var productousuarios = [];
var data;

function sendData(){
  fetch(Api + "cruds/products/?listarproductos", {
    method: "POST",
  })
    .then((Response) => Response.json())
    .then((dataResponse) => {
      cookies.set("productos", dataResponse, { path: "/" });
    })
    .catch(console.log()); 
};
sendData();
data = cookies.get("productos");
if (data != undefined) {
  data.map(function (x) {
    productousuarios.push({
      id: x.id_producto,
      nombre: x.nombre,
      descripcion: x.descripcion,
      stock: x.stock,
      precio: x.precio,
      marca: x.marca,
      categoria: x.categoria,
      avatarUrl: x.foto,
    });
  });
}

export {productousuarios};
