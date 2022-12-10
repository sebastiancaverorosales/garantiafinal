import { v4 as uuid } from "uuid";
import Api from "../services/Api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
var revisiones = [];
var data;

function sendData() {
  fetch(Api + "cruds/products/?listarrevisiones", {
    method: "POST",
  })
    .then((Response) => Response.json())
    .then((dataResponse) => {
      cookies.set("revisiones", dataResponse, { path: "/" });
    })
    .catch(console.log());
}
sendData();
data = cookies.get("revisiones");
if (data != undefined) {
  data.map(function (x) {
    revisiones.push({
      id: x.id_revision,
      nombreProducto: x.productonombre,
      nombre: x.nombre,
      ApPaterno: x.ap_paterno,
      ApMaterno: x.ap_materno,
      Descripcion: x.descripcion,
    });
  });
}

export { revisiones };
