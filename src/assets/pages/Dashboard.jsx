import React from "react";
import AsideMenu from "../components/AsideMenu";
import Header from "../components/Header";
import "../css/Dashboard.css";
import Api from "../services/Api";
import Cookies from "universal-cookie";
import * as XLSX from "xlsx/xlsx.mjs";

const cookies = new Cookies();

class Dashboard extends React.Component {
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

  sendData() {
    fetch(Api + "cruds/products/?dashboardcantidades", {
      method: "POST",
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        cookies.set("cantidades", dataResponse, { path: "/" });
      })
      .catch(console.log());
  }
  sendData2() {
    fetch(Api + "cruds/products/?listarpedidos", {
      method: "POST",
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        cookies.set("pedidos", dataResponse, { path: "/" });
      })
      .catch(console.log());
    fetch(Api + "cruds/products/?listargarantias", {
      method: "POST",
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        cookies.set("garantias", dataResponse, { path: "/" });
      })
      .catch(console.log());
    fetch(Api + "cruds/products/?listarproductos", {
      method: "POST",
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        cookies.set("productos", dataResponse, { path: "/" });
      })
      .catch(console.log());
    fetch(Api + "cruds/products/?listarrevisiones", {
      method: "POST",
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        cookies.set("revisiones", dataResponse, { path: "/" });
      })
      .catch(console.log());
  }

  render() {
    this.sendData();
    this.sendData2();
    function ExportData(data, archivo, tipo) {
      if (data == 0) {
        window.alert("No existen registros de " + tipo);
      }
      var filename = archivo + ".xlsx";
      var ws = XLSX.utils.json_to_sheet(data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "People");
      XLSX.writeFile(wb, filename);
    }
    var datos = cookies.get("cantidades");
    var jsondata1 = cookies.get("pedidos");
    var jsondata2 = cookies.get("garantias");
    var jsondata3 = cookies.get("productos");
    var jsondata4 = cookies.get("revisiones");
    return (
      <>
        <Header GetIds={this.GetIds}></Header>
        <div className="div-stats"></div>
        <AsideMenu></AsideMenu>
        <main className="main-class">
          <div className="main-div">
            <section>
              <div className="div-stats">
                <a
                  className="stat"
                  onClick={() =>
                    ExportData(jsondata1, "reportePedidos", "PEDIDOS")
                  }
                >
                  <h6>Pedidos</h6>
                  <h5>{datos[0][0]["COUNT(*)"]}</h5>
                  <p>Pedidos de este mes</p>
                  <svg
                    className="icons-dashboard"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <title>Order_history</title>
                    <g id="Order_history">
                      <path d="M251.2305,448H70.7735a150.4432,150.4432,0,0,0,32.2656-93.5391V64H381.4336V217.1719a8,8,0,0,0,16,0V56a7.9979,7.9979,0,0,0-8-8H95.0391a7.9979,7.9979,0,0,0-8,8V354.4609a134.7126,134.7126,0,0,1-39.711,95.8829A7.9993,7.9993,0,0,0,52.9844,464H251.2305a8,8,0,0,0,0-16Z" />
                      <path d="M333.9961,148.7656h-183.52a8,8,0,0,0,0,16h183.52a8,8,0,0,0,0-16Z" />
                      <path d="M341.9961,210.9688a7.9979,7.9979,0,0,0-8-8h-183.52a8,8,0,1,0,0,16h183.52A7.9979,7.9979,0,0,0,341.9961,210.9688Z" />
                      <path d="M262.2305,265.1719a7.9979,7.9979,0,0,0-8-8H150.4766a8,8,0,0,0,0,16H254.2305A7.9979,7.9979,0,0,0,262.2305,265.1719Z" />
                      <path d="M150.4766,311.375a8,8,0,1,0,0,16h65.2539a8,8,0,0,0,0-16Z" />
                      <path d="M436.7266,287.4609A103.32,103.32,0,0,0,261.7905,342.873l-6.3569-6.3574a7.9991,7.9991,0,0,0-11.3125,11.3125L262.53,366.2363a8.026,8.026,0,0,0,11.3232,0l18.4126-18.4082a7.9991,7.9991,0,0,0-11.3125-11.3125l-1.8169,1.8164a87.3378,87.3378,0,1,1,22.6568,84.0664,7.9991,7.9991,0,0,0-11.3125,11.3125,103.413,103.413,0,0,0,146.2461-146.25Z" />
                      <path d="M363.6055,291.32a7.9979,7.9979,0,0,0-8,8v61.2656a8.115,8.115,0,0,0,2.3506,5.6641l28.9931,28.9922A7.9991,7.9991,0,0,0,398.2617,383.93l-26.6562-26.6563V299.32A7.9979,7.9979,0,0,0,363.6055,291.32Z" />
                    </g>
                  </svg>
                </a>
                <a
                  className="stat"
                  onClick={() =>
                    ExportData(jsondata2, "reporteGarantias", "GARANTÍAS")
                  }
                >
                  <h6>Garantías</h6>
                  <h5>{datos[1][0]["COUNT(*)"]}</h5>
                  <p>Garantías de este mes</p>
                  <svg
                    className="icons-dashboard"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <title>Artboard 3</title>
                    <path d="M5,1V3H1V20a3,3,0,0,0,3,3H19.24A3.77,3.77,0,0,0,23,19.24V1ZM3,20V5H5V20a1,1,0,0,1-2,0Zm18-.76A1.76,1.76,0,0,1,19.24,21H6.82A3,3,0,0,0,7,20V3H21Z" />
                    <rect x="11" y="5" width="8" height="2" />
                    <rect x="9" y="9" width="10" height="2" />
                    <rect x="9" y="13" width="10" height="2" />
                    <rect x="9" y="17" width="10" height="2" />
                  </svg>
                </a>
                <a
                  className="stat"
                  onClick={() =>
                    ExportData(jsondata3, "reporteProductos", "PRODUCTOS")
                  }
                >
                  <h6>Productos</h6>
                  <h5>{datos[2][0]["COUNT(*)"]}</h5>
                  <p>Productos Totales de Almacén</p>
                  <svg
                    className="icons-dashboard"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  className="stat"
                  onClick={() =>
                    ExportData(jsondata4, "reporteRevisiones", "REVISIONES")
                  }
                >
                  <h6>Revisiones</h6>
                  <h5>{datos[3][0]["COUNT(*)"]}</h5>
                  <p>Revisiones de este mes</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-eye icons-dashboard"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </a>
              </div>
            </section>
          </div>
        </main>
      </>
    );
  }
}

export default Dashboard;
