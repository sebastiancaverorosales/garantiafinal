import React, { Component } from "react";
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import Api from "./assets/services/Api";

import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import Succes from "./assets/pages/Succes";

import Dashboard from "./assets/pages/Dashboard";
import Pedidos from "./assets/pages/Pedidos";
import Garantias from "./assets/pages/Garantias";
import Productos from "./assets/pages/Productos";
import Revisiones from "./assets/pages/Revisiones";
import EditarAnalista from "./assets/pages/EditarAnalista";
import Cuenta from "./assets/pages/Cuenta";

import GarantiasUsuario from "./assets/pages/GarantiasUsuario";
import PedidosUsuario from "./assets/pages/PedidosUsuario";
import ProductosUsuario from "./assets/pages/ProductosUsuario";
import RevisionesUsuario from "./assets/pages/RevisionesUsuario";

import AnalistaCE from "./assets/components/AnalistaCE";
import RevisionesC from "./assets/pages/RevisionesC";
import RevisionesE from "./assets/pages/RevisionesE";
import ProductosC from "./assets/pages/ProductosC";
import ProductosE from "./assets/pages/ProductosE";
import GarantiasC from "./assets/pages/GarantiasC";
import PedidosC from "./assets/pages/PedidosC";
import Cookies from "universal-cookie";

const cookies = new Cookies();
var rol = cookies.get("id_rol");
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    logged: cookies.get("logged"),
  };

  // componentDidMount(){
  //   console.log("primer aviso");
  //   this.render();
  //   // if (this.state.logged > 0) {
  //   //   console.log("Segundo");
  //   //   <Link to={"/succes"}></Link>
  //   // }
  // }
  CambiarEstado = () => {
    if (this.state.logged == 0) {
      this.setState({
        logged: 1,
      });
      cookies.set("logged", "1", { path: "/" });
      // return this.renderApp();
    } else {
      this.setState({
        logged: 0,
      });
      cookies.set("logged", "0", { path: "/" });
      // return this.renderLogin();
    }
  };
  returnLogin() {
    window.history.pushState(null, "", "");
  }
  renderLogin() {
    this.EjecutarFetchs();
    return (
      <>
        {this.EjecutarFetchs()}
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Login CambiarEstado={this.CambiarEstado}></Login>}
            ></Route>
            <Route
              exact
              path="/register"
              element={<Register CambiarEstado={this.CambiarEstado}></Register>}
            ></Route>
            <Route exact path="*" element={<>ERROR: 404</>}></Route>
          </Routes>
        </Router>
      </>
    );
  }
  EjecutarFetchs() {
    fetch(Api + "cruds/products/?dashboardcantidades", {
      method: "POST",
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        cookies.set("cantidades", dataResponse, { path: "/" });
      })
      .catch(console.log());
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
  renderApp() {
    if (rol == 1) {
      return (
        <Router>
          <div className="container">
            <Routes>
              <Route
                exact
                path="/pedidos"
                element={<Pedidos CambiarEstado={this.CambiarEstado}></Pedidos>}
              ></Route>
              <Route
                exact
                path="/garantias"
                element={
                  <Garantias CambiarEstado={this.CambiarEstado}></Garantias>
                }
              ></Route>
              <Route
                exact
                path="/productos"
                element={
                  <Productos CambiarEstado={this.CambiarEstado}></Productos>
                }
              ></Route>
              <Route
                exact
                path="/revisiones"
                element={
                  <Revisiones CambiarEstado={this.CambiarEstado}></Revisiones>
                }
              ></Route>
              <Route
                exact
                path="/analistas"
                element={
                  <EditarAnalista
                    CambiarEstado={this.CambiarEstado}
                  ></EditarAnalista>
                }
              ></Route>
              <Route
                exact
                path="/cuenta"
                element={<Cuenta CambiarEstado={this.CambiarEstado}></Cuenta>}
              ></Route>
              <Route
                exact
                path="/analistas/crear"
                element={
                  <AnalistaCE CambiarEstado={this.CambiarEstado}></AnalistaCE>
                }
              ></Route>
              <Route
                exact
                path="/revisiones/crear"
                element={
                  <RevisionesC CambiarEstado={this.CambiarEstado}></RevisionesC>
                }
              ></Route>
              <Route
                exact
                path="/revisiones/editar"
                element={
                  <RevisionesE CambiarEstado={this.CambiarEstado}></RevisionesE>
                }
              ></Route>
              <Route
                exact
                path="/productos/crear"
                element={
                  <ProductosC CambiarEstado={this.CambiarEstado}></ProductosC>
                }
              ></Route>
              <Route
                exact
                path="/productos/editar"
                element={
                  <ProductosE CambiarEstado={this.CambiarEstado}></ProductosE>
                }
              ></Route>
              <Route
                exact
                path="/garantias/crear"
                element={
                  <GarantiasC CambiarEstado={this.CambiarEstado}></GarantiasC>
                }
              ></Route>
              <Route
                exact
                path="/pedidos/crear"
                element={
                  <PedidosC CambiarEstado={this.CambiarEstado}></PedidosC>
                }
              ></Route>
              <Route exact path="/" element={<Dashboard></Dashboard>}></Route>
              {/*=============================== RUTA PARA ERRORES ===============================*/}
              <Route exact path="*" element={<>ERROR: 404</>}></Route>
              {/*========================= RUTA PARA VOLVER AL DASHBOARD ========================= */}
            </Routes>
          </div>
        </Router>
      );
    } else if (rol == 2) {
      return (
        <Router>
          <div className="container">
            <Routes>
              <Route
                exact
                path="/pedidos"
                element={<Pedidos CambiarEstado={this.CambiarEstado}></Pedidos>}
              ></Route>
              <Route
                exact
                path="/garantias"
                element={
                  <Garantias CambiarEstado={this.CambiarEstado}></Garantias>
                }
              ></Route>
              <Route
                exact
                path="/productos"
                element={
                  <Productos CambiarEstado={this.CambiarEstado}></Productos>
                }
              ></Route>
              <Route
                exact
                path="/revisiones"
                element={
                  <Revisiones CambiarEstado={this.CambiarEstado}></Revisiones>
                }
              ></Route>
              <Route
                exact
                path="/cuenta"
                element={<Cuenta CambiarEstado={this.CambiarEstado}></Cuenta>}
              ></Route>
              <Route
                exact
                path="/revisiones/crear"
                element={
                  <RevisionesC CambiarEstado={this.CambiarEstado}></RevisionesC>
                }
              ></Route>
              <Route
                exact
                path="/revisiones/editar"
                element={
                  <RevisionesE CambiarEstado={this.CambiarEstado}></RevisionesE>
                }
              ></Route>
              <Route
                exact
                path="/productos/crear"
                element={
                  <ProductosC CambiarEstado={this.CambiarEstado}></ProductosC>
                }
              ></Route>
              <Route
                exact
                path="/productos/editar"
                element={
                  <ProductosE CambiarEstado={this.CambiarEstado}></ProductosE>
                }
              ></Route>
              <Route
                exact
                path="/garantias/crear"
                element={
                  <GarantiasC CambiarEstado={this.CambiarEstado}></GarantiasC>
                }
              ></Route>
              <Route
                exact
                path="/pedidos/crear"
                element={
                  <PedidosC CambiarEstado={this.CambiarEstado}></PedidosC>
                }
              ></Route>
              <Route exact path="/" element={<Dashboard></Dashboard>}></Route>
              {/*=============================== RUTA PARA ERRORES ===============================*/}
              <Route exact path="*" element={<>ERROR: 404</>}></Route>
              {/*========================= RUTA PARA VOLVER AL DASHBOARD ========================= */}
            </Routes>
          </div>
        </Router>
      );
    } else if (rol == 3) {
      return (
        <Router>
          <div className="container">
            <Routes>
              <Route
                exact
                path="/pedidos"
                element={<PedidosUsuario></PedidosUsuario>}
              ></Route>
              <Route
                exact
                path="/productos"
                element={
                  <ProductosUsuario
                    CambiarEstado={this.CambiarEstado}
                  ></ProductosUsuario>
                }
              ></Route>
              <Route
                exact
                path="/revisiones"
                element={
                  <RevisionesUsuario
                    CambiarEstado={this.CambiarEstado}
                  ></RevisionesUsuario>
                }
              ></Route>
              <Route
                exact
                path="/success"
                element={<Succes CambiarEstado={this.CambiarEstado}></Succes>}
              ></Route>
              <Route
                exact
                path="/cuenta"
                element={<Cuenta CambiarEstado={this.CambiarEstado}></Cuenta>}
              ></Route>
              <Route
                exact
                path="/"
                element={<GarantiasUsuario></GarantiasUsuario>}
              ></Route>
              {/*=============================== RUTA PARA ERRORES ===============================*/}
              <Route exact path="*" element={<>ERROR: 404</>}></Route>
              {/*========================= RUTA PARA VOLVER AL DASHBOARD ========================= */}
            </Routes>
          </div>
        </Router>
      );
    }
  }

  render() {
    console.log(this.state.logged);
    console.log(cookies.get("logged"));
    if (this.state.logged > 0) {
      console.log("PASOLOGIN");
      return this.renderApp();
    } else {
      console.log("no paso");
      return this.renderLogin();
    }
  }
}

export default App;
