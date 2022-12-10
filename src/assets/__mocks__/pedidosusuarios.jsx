import { v4 as uuid } from "uuid";
import Api from "../services/Api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
var pedidousuarios = [];
var data;

function sendData() {
  fetch(Api + "cruds/products/?listarpedidosusuario", {
    method: "POST",
    body: JSON.stringify(cookies.get("id_user")),
  })
    .then((Response) => Response.json())
    .then((dataResponse) => {
      cookies.set("pedidosusuario", dataResponse, { path: "/" });
    })
    .catch(console.log());
}
sendData();
data = cookies.get("pedidosusuario");
if (data != undefined) {
  if (data[0]["success"] != 0) {
    data.map(function (x) {
      pedidousuarios.push({
        id: x.id_pedido,
        Usuario: x.id_usuario,
        Total: x.totalpagar,
        Producto: x.producto,
        Fecha: x.fecha,
        estado: x.estado,
      });
    });
  }
}

export { pedidousuarios };
