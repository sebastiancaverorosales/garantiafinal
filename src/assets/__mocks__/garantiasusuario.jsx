import { v4 as uuid } from "uuid";
import Api from "../services/Api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
var garantiausuarios = [];
var data;

function sendData() {
  fetch(Api + "cruds/products/?listargarantiasusuario", {
    method: "POST",
    body: JSON.stringify(cookies.get("id_user")),
  })
    .then((Response) => Response.json())
    .then((dataResponse) => {
      cookies.set("garantiasusuario", dataResponse, { path: "/" });
    })
    .catch(console.log());
}
sendData();
data = cookies.get("garantiasusuario");
if (data != undefined) {
  if (data[0]["success"] != 0) {
    data.map(function (x) {
      garantiausuarios.push({
        id: x.id_garantia,
        Usuario: x.id_usuario,
        Tipo: x.tipo,
        Producto: x.nombre,
        Fecha: x.fechavencimiento,
        Estado: x.estadorenovar,
      });
    });
  }
}

export { garantiausuarios };
