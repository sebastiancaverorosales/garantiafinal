import React from "react";
// import "../css/Login.css";
import "../css/LoginPlantilla.css";
import Api from "../services/Api";
import { Link, BrowserRouter as Router } from "react-router-dom";
import Cookies from "universal-cookie";
// import { Redirect } from "react-router";
// import { FSession } from "../services/Session";
// import {valor} from "../../App";
const cookies = new Cookies();
class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    dataLoaded: false,
    usuario: [],
    loggedin: false,
  };
  componentDidMount() {
    // window.history.pushState(null, "", "/");
  }
  changeValue = (e) => {
    e.preventDefault();
    const state = this.state.usuario;
    state[e.target.name] = e.target.value;
    this.setState({ state });
  };
  sendData = (e) => {
    e.preventDefault();
    const { user } = this.state.usuario;
    var dataSend = {
      user: document.getElementById("user").value,
      contrasena: document.getElementById("password").value,
    };
    console.log(dataSend);
    fetch(Api + "cruds/usuarios/?login=" + user, {
      method: "POST",
      body: JSON.stringify(dataSend),
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        if (dataResponse[1]["success"] == 1) {
          if (dataResponse[0][0]["contrasena"] === dataSend.contrasena) {
            this.state.loggedin = true;
            this.props.CambiarEstado();
            cookies.set("id_user", document.getElementById("user").value, {
              path: "/",
            });
            cookies.set("contrasena", dataResponse[0][0]["contrasena"], {
              path: "/",
            });
            cookies.set("nombre", dataResponse[0][0]["nombre"], { path: "/" });
            cookies.set("ap_paterno", dataResponse[0][0]["ap_paterno"], {
              path: "/",
            });
            cookies.set("ap_materno", dataResponse[0][0]["ap_materno"], {
              path: "/",
            });
            cookies.set("dni", dataResponse[0][0]["dni"], { path: "/" });
            cookies.set("direccion", dataResponse[0][0]["direccion"], {
              path: "/",
            });
            cookies.set("celular", dataResponse[0][0]["celular"], {
              path: "/",
            });
            cookies.set("foto", dataResponse[0][0]["foto"], { path: "/" });
            cookies.set("id_rol", dataResponse[0][0]["id_rol"], { path: "/" });
            switch (dataResponse[0][0]["id_rol"]) {
              case 1:
                cookies.set("rol", "Administrador", { path: "/" });
                break;
              case 2:
                cookies.set("rol", "Analista", { path: "/" });
                break;
              default:
                cookies.set("rol", "Cliente", { path: "/" });
                break;
            }

            // window.history.pushState(null, "", "/dashboard");
            window.location.href = "/";
          } else {
            window.alert("Credenciales incorrectas.");
          }
        } else {
          window.alert("Credenciales incorrectas.");
        }
      })
      .catch(console.log());
  };
  render() {
    return (
      <div id="__next">
        <main className="MuiBox-root css-42lgqe">
          <div className="MuiContainer-root MuiContainer-maxWidthSm css-1m6pqln">
            <form onSubmit={this.sendData}>
              <div className="MuiBox-root css-5vb4lz">
                <h4 className="MuiTypography-root MuiTypography-h4 css-2voflx">
                  Login
                </h4>
                <p className="MuiTypography-root MuiTypography-body2 MuiTypography-gutterBottom css-imsni4">
                  Ingresa a la plataforma
                </p>
              </div>
              <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb"></div>
              <div className="MuiBox-root css-47wgsv"></div>
              <div className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-1u0h3mu">
                <label
                  className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1x3fk9d"
                  data-shrink="true"
                  htmlFor=":r0:"
                  id=":r0:-label"
                >
                  Usuario
                </label>
                <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-yrb7tp">
                  <input
                    required
                    id="user"
                    name="user"
                    type="text"
                    onChange={this.changeValue}
                    className="MuiInputBase-input MuiOutlinedInput-input css-j6vbi8"
                    placeholder="Usuario"
                  />
                </div>
              </div>
              <div className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-1u0h3mu">
                <label
                  className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled css-1x3fk9d"
                  data-shrink="true"
                  htmlFor=":r1:"
                  id=":r1:-label"
                >
                  Contraseña
                </label>
                <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-yrb7tp">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    onChange={this.changeValue}
                    className="MuiInputBase-input MuiOutlinedInput-input css-j6vbi8"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
              <div className="MuiBox-root css-1sf3xto">
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-disableElevation MuiButton-fullWidth css-1nltg4l"
                  type="submit"
                >
                  INGRESAR
                </button>
              </div>
              <p className="MuiTypography-root MuiTypography-body2 css-f1egar">
                ¿No tienes una cuenta?{" "}
                <a
                  className="MuiTypography-root MuiTypography-subtitle2 MuiLink-root MuiLink-underlineHover css-1c2db0i"
                  href="/register"
                >
                  Registrate
                </a>
              </p>
            </form>
          </div>
        </main>
      </div>
      // <div className="login">
      //   <h1 className="text-center">Hello Again!</h1>

      //   <form className="needs-validation" onSubmit={this.sendData}>
      //     <div className="form-group was-validated">
      //       <label className="form-label" htmlFor="email">
      //         USUARIO
      //       </label>
      //       <input
      //         className="form-control"
      //         type="text"
      //         name="user"
      //         id="user"
      //         required
      //         onChange={this.changeValue}
      //       />
      //       <div className="invalid-feedback">Ingrese su usuario</div>
      //     </div>
      //     <div className="form-group was-validated">
      //       <label className="form-label" htmlFor="password">
      //         CONTRASEÑA
      //       </label>
      //       <input
      //         className="form-control"
      //         type="password"
      //         id="password"
      //         name="password"
      //         required
      //         onChange={this.changeValue}
      //       />
      //       <div className="invalid-feedback">Ingrese su contraseña</div>
      //     </div>
      //     <div className="form-group form-check">
      //       <input className="form-check-input" type="checkbox" id="check" />
      //       <label className="form-check-label" htmlFor="check">
      //         Remember me
      //       </label>
      //     </div>
      //     <input
      //       className="btn btn-success w-100"
      //       type="submit"
      //       value="INGRESAR"
      //     />
      //   </form>
      // </div>
    );
  }
}
export default Login;
