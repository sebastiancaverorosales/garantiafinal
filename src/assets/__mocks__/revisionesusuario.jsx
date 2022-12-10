import { v4 as uuid } from 'uuid';
import Api from "../services/Api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
var revisionusuarios = [];
var data;

function sendData() {
  fetch(Api + "cruds/products/?listarrevisionesusuario", {
    method: "POST",
    body: JSON.stringify(cookies.get("id_user"))
  })
    .then((Response) => Response.json())
    .then((dataResponse) => {
      cookies.set("revisionesusuario", dataResponse, { path: "/" });
    })
    .catch(console.log());
}
sendData();
data = cookies.get("revisionesusuario");
if (data != undefined) {
  if (data[0]['success'] != 0) {
  data.map(function (x) {
    revisionusuarios.push({
      id: x.id_revision,
      nombreProducto: x.productonombre,
      nombre: x.nombre,
      ApPaterno: x.ap_paterno,
      ApMaterno: x.ap_materno,
      Descripcion: x.descripcion,
    });
  });
}
}




export  {revisionusuarios};