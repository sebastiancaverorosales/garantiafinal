import React from "react";
import AsideMenu from "../components/AsideMenu";
import Header from "../components/Header";
import {
  Box
} from '@mui/material';
import { Container } from '@mui/system';
import { PedidosResult } from '../components/pedidos-result';
import { PedidosListToolbar } from '../components/pedidos-toolbar';
import { pedidos } from '../__mocks__/pedidos';


class Pedidos extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {}
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
  render() {
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
            marginLeft: ("auto"),
            marginRight: ("auto")
          }}
        >
          <Container maxWidth={false}
          >
            <PedidosListToolbar />
            <Box sx={{ mt: 3 }}
            >
              <PedidosResult pedidos={pedidos} />
            </Box>
          </Container>
        </Box>


      </>
    );
  }
}

export default Pedidos;