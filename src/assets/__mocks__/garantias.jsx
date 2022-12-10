import { v4 as uuid } from "uuid";
import Api from "../services/Api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
var garantias = [];
var data;

function sendData() {
  fetch(Api + "cruds/products/?listargarantias", {
    method: "POST",
  })
    .then((Response) => Response.json())
    .then((dataResponse) => {
      cookies.set("garantias", dataResponse, { path: "/" });
    })
    .catch(console.log());
}
sendData();
data = cookies.get("garantias");
if (data != undefined) {
  data.map(function (x) {
    garantias.push({
      id: x.id_garantia,
      Usuario: x.id_usuario,
      Tipo: x.tipo,
      Producto: x.nombre,
      Fecha: x.fechavencimiento,
      Estado: x.estadorenovar,
    });
  });
}

export { garantias };
