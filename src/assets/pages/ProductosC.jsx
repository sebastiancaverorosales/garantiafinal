import React from "react";
import Api from "../services/Api";
import AsideMenu from "../components/AsideMenu";
import Header from "../components/Header";
import Cookies from "universal-cookie";
import $ from "jquery";
const cookies = new Cookies();
var jsondata = cookies.get("reportes");
var datos = cookies.get("cantidades");

class ProductosC extends React.Component {
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
    var dataSend = {
      id: (parseInt(datos[2][0]["COUNT(*)"], 10) + 1).toString(),
      nombre: $("#nombre").val(),
      descripcion: $("#descripcion").val(),
      stock: $("#stock").val(),
      precio: $("#precio").val(),
    };
    if (document.getElementById("marcaCheckbox").checked) {
      dataSend["marca"] = (
        parseInt(datos[5][0]["COUNT(*)"], 10) + 1
      ).toString();
      var dataSend1 = {
        id: (parseInt(datos[5][0]["COUNT(*)"], 10) + 1).toString(),
        nombre: $("#marcaInput").val(),
      };
      fetch(Api + "cruds/products/?crearmarca", {
        method: "POST",
        body: JSON.stringify(dataSend1),
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
        })
        .catch(console.log());
    } else {
      dataSend["marca"] = $("#marcaSelect").val();
    }
    if (document.getElementById("categoriaCheckbox").checked) {
      dataSend["categoria"] = (
        parseInt(datos[4][0]["COUNT(*)"], 10) + 1
      ).toString();
      var dataSend2 = {
        id: (parseInt(datos[4][0]["COUNT(*)"], 10) + 1).toString(),
        nombre: $("#categoriaInput").val(),
      };
      fetch(Api + "cruds/products/?crearcategoria", {
        method: "POST",
        body: JSON.stringify(dataSend2),
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
        })
        .catch(console.log());
    } else {
      dataSend["categoria"] = $("#categoriaSelect").val();
    }
    console.log(dataSend);
    fetch(Api + "cruds/products/?crearproducto", {
      method: "POST",
      body: JSON.stringify(dataSend),
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        window.alert(
          "Producto " +
            (parseInt(datos[2][0]["COUNT(*)"], 10) + 1).toString() +
            " Creado"
        );
        window.location.href = "/productos";
      })
      .catch(console.log());
  }

  render() {
    function traerData() {
      fetch(Api + "cruds/products/?mostrarmarcas", {
        method: "POST",
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          cookies.set("marcasObtenidas", dataResponse, { path: "/" });
        })
        .catch(console.log());

      fetch(Api + "cruds/products/?mostrarcategorias", {
        method: "POST",
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          cookies.set("categoriasObtenidas", dataResponse, { path: "/" });
        })
        .catch(console.log());
    }
    traerData();

    function mostrarMarca() {
      var data = [];
      cookies.get("marcasObtenidas").map(function (x) {
        data.push(
          <option key={x.id_marca} value={x.id_marca}>
            {x.nombre}
          </option>
        );
      });
      return data;
    }
    function mostrarCategoria() {
      var data = [];
      cookies.get("categoriasObtenidas").map(function (x) {
        data.push(
          <option key={x.id_categoria} value={x.id_categoria}>
            {x.nombre}
          </option>
        );
      });
      return data;
    }
    function NuevaMarca(id) {
      if (document.getElementById(id).checked) {
        document.getElementById("selectmarca").style.display = "none";
        document.getElementById("marcaSelect").removeAttribute("required");
        document.getElementById("inputmarca").style.display = "block";
        document.getElementById("marcaInput").setAttribute("required", "");
      } else {
        document.getElementById("selectmarca").style.display = "block";
        document.getElementById("marcaSelect").setAttribute("required", "");
        document.getElementById("inputmarca").style.display = "none";
        document.getElementById("marcaInput").removeAttribute("required");
      }
    }
    function NuevaCategoria(id) {
      if (document.getElementById(id).checked) {
        document.getElementById("selectcategoria").style.display = "none";
        document.getElementById("categoriaSelect").removeAttribute("required");
        document.getElementById("inputcategoria").style.display = "block";
        document.getElementById("categoriaInput").setAttribute("required", "");
      } else {
        document.getElementById("selectcategoria").style.display = "block";
        document.getElementById("categoriaSelect").setAttribute("required", "");
        document.getElementById("inputcategoria").style.display = "none";
        document.getElementById("categoriaInput").removeAttribute("required");
      }
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
                    Crear Producto
                  </h4>
                  <p className="MuiTypography-root MuiTypography-body2 MuiTypography-gutterBottom css-imsni4">
                    Cree el producto en los siguientes apartados:
                  </p>
                </div>

                <div className="flex-form">
                  <div>
                    <div className="css-1u0h3mu">
                      <div className="css-yrb7tp">
                        <label
                          className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1x3fk9d"
                          data-shrink="true"
                          htmlFor=":r0:"
                          id=":r0:-label"
                        >
                          Nombre:
                        </label>
                        <input
                          aria-invalid="false"
                          id="nombre"
                          type="text"
                          required
                          className="MuiInputBase-input MuiOutlinedInput-input css-j6vbi8"
                          placeholder="Nombre"
                        />
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
                          Descripción:
                        </label>
                        <textarea
                          aria-invalid="false"
                          id="descripcion"
                          cols="30"
                          rows="10"
                          required
                          placeholder="Descripción"
                          className="MuiInputBase-input MuiOutlinedInput-input css-j6vbi8"
                        ></textarea>
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
                          Stock:
                        </label>
                        <input
                          aria-invalid="false"
                          id="stock"
                          type="tel"
                          required
                          className="MuiInputBase-input MuiOutlinedInput-input css-j6vbi8"
                          placeholder="Stock"
                        />
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
                          Precio:
                        </label>
                        <input
                          aria-invalid="false"
                          id="precio"
                          type="tel"
                          required
                          className="MuiInputBase-input MuiOutlinedInput-input css-j6vbi8"
                          placeholder="Stock"
                        />
                      </div>
                    </div>
                    <div id="marquita" className="css-1u0h3mu">
                      <div
                        className="css-yrb7tp"
                        style={{ flexDirection: "row-reverse" }}
                      >
                        <div
                          className="css-yrb7tp"
                          style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                          }}
                        >
                          <div
                            className="form-check"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              margin: 0,
                            }}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="marcaCheckbox"
                              onClick={() => NuevaMarca("marcaCheckbox")}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                              style={{
                                textAlign: "center",
                                marginLeft: 10,
                              }}
                            >
                              Nueva Marca
                            </label>
                          </div>
                        </div>
                        <div id="selectmarca" className="css-yrb7tp">
                          <label
                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1x3fk9d"
                            data-shrink="true"
                            htmlFor=":r0:"
                            id=":r0:-label"
                          >
                            Marca:
                          </label>
                          <select
                            required
                            className="css-j6vbi8 graycolor"
                            id="marcaSelect"
                          >
                            <option value="">---</option>
                            {mostrarMarca()}
                          </select>
                        </div>
                        {/* Nueva Marca Input */}
                        <div
                          id="inputmarca"
                          className="css-yrb7tp"
                          style={{ display: "none" }}
                        >
                          <label
                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1x3fk9d"
                            data-shrink="true"
                            htmlFor=":r0:"
                            id=":r0:-label"
                          >
                            Nueva Marca:
                          </label>
                          <input
                            aria-invalid="false"
                            id="marcaInput"
                            type="text"
                            className="MuiInputBase-input MuiOutlinedInput-input css-j6vbi8"
                            placeholder="Marca"
                          />
                        </div>
                      </div>
                    </div>
                    <div id="categorita" className="css-1u0h3mu">
                      <div
                        className="css-yrb7tp"
                        style={{ flexDirection: "row-reverse" }}
                      >
                        <div
                          className="css-yrb7tp"
                          style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                          }}
                        >
                          <div
                            className="form-check"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              margin: 0,
                            }}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="categoriaCheckbox"
                              onClick={() =>
                                NuevaCategoria("categoriaCheckbox")
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                              style={{
                                textAlign: "center",
                                marginLeft: 10,
                              }}
                            >
                              Nueva Categoría
                            </label>
                          </div>
                        </div>
                        <div id="selectcategoria" className="css-yrb7tp">
                          <label
                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1x3fk9d"
                            data-shrink="true"
                            htmlFor=":r0:"
                            id=":r0:-label"
                          >
                            Categoría:
                          </label>
                          <select
                            required
                            className="css-j6vbi8 graycolor"
                            id="categoriaSelect"
                          >
                            <option value="">---</option>
                            {mostrarCategoria()}
                          </select>
                        </div>
                        {/* Nueva Marca Input */}
                        <div
                          id="inputcategoria"
                          className="css-yrb7tp"
                          style={{ display: "none" }}
                        >
                          <label
                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1x3fk9d"
                            data-shrink="true"
                            htmlFor=":r0:"
                            id=":r0:-label"
                          >
                            Nueva Categoria:
                          </label>
                          <input
                            aria-invalid="false"
                            id="categoriaInput"
                            type="text"
                            className="MuiInputBase-input MuiOutlinedInput-input css-j6vbi8"
                            placeholder="Nombre Categoría"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="MuiBox-root css-1sf3xto">
                  <button
                    className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-disableElevation MuiButton-fullWidth css-1nltg4l"
                    tabIndex="0"
                    type="submit"
                    id="btnCrear"
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

export default ProductosC;
