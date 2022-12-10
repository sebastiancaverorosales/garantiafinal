import { v4 as uuid } from 'uuid';
import Api from "../services/Api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
var pedidos = [];
var data;

function sendData() {
  fetch(Api + "cruds/products/?listarpedidos", {
    method: "POST",
  })
    .then((Response) => Response.json())
    .then((dataResponse) => {
      cookies.set("pedidos", dataResponse, { path: "/" });
    })
    .catch(console.log());
}
sendData();
data = cookies.get("pedidos");
if (data != undefined) {
  data.map(function (x) {
    pedidos.push({
      id: x.id_pedido,
      Usuario: x.id_usuario,
      Total: x.totalpagar,
      Producto: x.producto,
      Fecha: x.fecha,
      estado: x.estado
    });
  });
}

export { pedidos };