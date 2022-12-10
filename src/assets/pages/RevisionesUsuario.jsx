import React from "react";
import AsideMenu from "../components/AsideMenu";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { RevisionResultUsuario } from "../components/revisionesusuario-result";
import { RevisionListToolbarUsuario } from "../components/revisionesusuario-toolbar";
import { revisionusuarios } from "../__mocks__/revisionesusuario";
import { ThreeSixty } from "@mui/icons-material";
import Api from "../services/Api";
import Cookies from "universal-cookie";
import * as XLSX from "xlsx/xlsx.mjs";

const cookies = new Cookies();
class RevisionesUsuario extends React.Component {
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
    fetch(Api + "cruds/products/?reportesusuario", {
      method: "POST",
      body: JSON.stringify(cookies.get("id_user")),
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        cookies.set("reportesusuario", dataResponse, { path: "/" });
      })
      .catch(console.log());
  }
  render() {
    this.sendData();
    this.sendData2();
    return (
      <>
        <Header GetIds={this.GetIds}></Header>
        <AsideMenu></AsideMenu>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
            marginTop: 0,
            marginBotton: 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Container maxWidth={false}>
            <RevisionListToolbarUsuario />
            <Box sx={{ mt: 3 }}>
              <RevisionResultUsuario revisionusuarios={revisionusuarios} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}

export default RevisionesUsuario;
