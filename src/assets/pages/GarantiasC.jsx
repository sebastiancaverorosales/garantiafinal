import React from "react";
import Header from "../components/Header";
import AsideMenu from "../components/AsideMenu";

import Cookies from "universal-cookie";
import Api from "../services/Api";
const cookies = new Cookies();

class GarantiasC extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};
  GetIds() {
    var Header = document.getElementById("Menu").parentNode.parentNode;
    var AsideMenu = document.getElementById("AsideMenu");
    if (AsideMenu.hasAttribute("hidden")) {
      AsideMenu.removeAttribute("hidden");
      Header.classList.add("changeSize");
    } else {
      Header.classList.remove("changeSize");
      AsideMenu.setAttribute("hidden", "1");
    }
  }
  sendData(e) {
    e.preventDefault();

    var datos = cookies.get("cantidades");

    var f = new Date();
    if (f.getMonth() + 1 == 2 && f.getDate() == 29) {
      var fechaHoyString =
        f.getFullYear() +
        1 +
        "-0" +
        (f.getMonth() + 1) +
        "-" +
        (f.getDate() - 1);
    } else if (f.getMonth() + 1 < 10) {
      var fechaHoyString =
        f.getFullYear() + 1 + "-0" + (f.getMonth() + 1) + "-" + f.getDate();
    } else {
      var fechaHoyString =
        f.getFullYear() + 1 + "-" + (f.getMonth() + 1) + "-" + f.getDate();
    }

    var dataSend = {
      idGarantia: parseInt(datos[1][0]["COUNT(*)"], 10) + 1,
      idProducto: document.getElementById("producto").value,
      idUsuario: document.getElementById("usuario").value,
      idTipoGarantia: document.getElementById("tipogarantia").value,
      fechaVencimiento: fechaHoyString,
    };

    fetch(Api + "cruds/products/?insertarGarantias", {
      method: "POST",
      body: JSON.stringify(dataSend),
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        window.alert("Garantía Creada.");
        fetch(Api + "cruds/products/?reportes", {
          method: "POST",
        })
          .then((Response) => Response.json())
          .then((dataResponse) => {
            cookies.set("reportes", dataResponse, { path: "/" });
            window.location.href = "/garantias";
          })
          .catch(console.log());
      })
      .catch(console.log());
  }
  render() {
    function traerData() {
      fetch(Api + "cruds/usuarios/?listarclientes", {
        method: "POST",
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          cookies.set("usuarioObtenidos", dataResponse, { path: "/" });
        })
        .catch(console.log());
      fetch(Api + "cruds/products/?listarproductos", {
        method: "POST",
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          cookies.set("productosObtenidos", dataResponse, { path: "/" });
        })
        .catch(console.log());
      fetch(Api + "cruds/products/?listartipogarantia", {
        method: "POST",
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          cookies.set("tipoGarantiasObtenidas", dataResponse, { path: "/" });
        })
        .catch(console.log());
    }
    traerData();

    function mostrarUsuario() {
      var data = [];
      cookies.get("usuarioObtenidos").map(function (x) {
        data.push(
          <option key={x.id_usuario} value={x.id_usuario}>
            {x.nombre + " " + x.ap_paterno}
          </option>
        );
      });
      return data;
    }
    function mostrarProducto() {
      var data1 = [];
      cookies.get("productosObtenidos").map(function (x) {
        data1.push(
          <option key={x.id_producto} value={x.id_producto}>
            {x.nombre}
          </option>
        );
      });
      return data1;
    }
    function mostrarTipoGarantia() {
      var data1 = [];
      cookies.get("tipoGarantiasObtenidas").map(function (x) {
        data1.push(
          <option key={x.id_tipogarantia} value={x.id_tipogarantia}>
            {x.nombre}
          </option>
        );
      });
      return data1;
    }
    return (
      <>
        <Header GetIds={this.GetIds}></Header>
        <AsideMenu></AsideMenu>
        <div id="__next">
          <main className="MuiBox-root css-42lgqe">
            <div className="MuiContainer-root MuiContainer-maxWidthSm css-1m6pqln">
              <form
                onSubmit={this.sendData}
                encType="multipart/form-data"
                id="form"
              >
                <div className="MuiBox-root css-5vb4lz">
                  <h4 className="MuiTypography-root MuiTypography-h4 css-2voflx">
                    Crea una Garantía
                  </h4>
                  <p className="MuiTypography-root MuiTypography-body2 MuiTypography-gutterBottom css-imsni4">
                    Cree una Garantía en los siguientes apartados:<br></br>
                    (Las garantía nuevas duran 1 año por defecto)
                  </p>
                </div>
                <div className="flex-form">
                  <div style={{ width: 100 + "%" }}>
                    <div className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-1u0h3mu">
                      <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-yrb7tp">
                        <label
                          className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1x3fk9d"
                          data-shrink="true"
                          htmlFor=":r0:"
                          id=":r0:-label"
                        >
                          Usuario
                        </label>
                        <select
                          required
                          className="css-j6vbi8 graycolor"
                          id="usuario"
                        >
                          <option value="">---</option>
                          {mostrarUsuario()}
                        </select>
                      </div>
                    </div>
                    <div className="css-1u0h3mu ">
                      <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-yrb7tp">
                        <label
                          className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1x3fk9d"
                          data-shrink="true"
                          htmlFor=":r0:"
                          id=":r0:-label"
                        >
                          Producto
                        </label>
                        <select
                          required
                          className="css-j6vbi8 graycolor"
                          id="producto"
                        >
                          <option value="">---</option>
                          {mostrarProducto()}
                        </select>
                      </div>
                    </div>
                    <div className="css-1u0h3mu">
                      <div className="css-yrb7tp">
                        <label
                          className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1x3fk9d"
                          data-shrink="true"
                          htmlFor=":r0:"
                          id=":r0:-label"
                        >
                          Tipo de Garantía
                        </label>
                        <select
                          required
                          className="css-j6vbi8 graycolor"
                          id="tipogarantia"
                        >
                          <option value="">---</option>
                          {mostrarTipoGarantia()}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="MuiBox-root css-1sf3xto">
                  <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-disableElevation MuiButton-fullWidth css-1nltg4l"
                    tabIndex="0"
                    type="submit"
                    id="btnRegistrar"
                  >
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default GarantiasC;
