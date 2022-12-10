import { v4 as uuid } from "uuid";
import Api from "../services/Api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
var analistas = [];
var data;

function sendData() {
  fetch(Api + "cruds/usuarios/?listaranalistas", {
    method: "POST",
  })
    .then((Response) => Response.json())
    .then((dataResponse) => {
      cookies.set("analistas", dataResponse, { path: "/" });
    })
    .catch(console.log());
}
sendData();
data = cookies.get("analistas");
if (data != undefined) {
  if (data[0]["success"] != 0) {
    data.map(function (x) {
      if (x.ap_materno == "") {
        x.ap_materno = "-";
        analistas.push({
          id: x.id_usuario,
          nombre: x.nombre,
          ApePaterno: x.ap_paterno,
          ApeMaterno: x.ap_materno,
          DNI: x.dni,
          Direccion: x.direccion,
          Celular: x.celular,
          Genero: x.genero,
        });
      } else {
        analistas.push({
          id: x.id_usuario,
          nombre: x.nombre,
          ApePaterno: x.ap_paterno,
          ApeMaterno: x.ap_materno,
          DNI: x.dni,
          Direccion: x.direccion,
          Celular: x.celular,
          Genero: x.genero,
        });
      }
    });
  }
}

export { analistas };
