import React from "react";
import Api from "../services/Api";
import AsideMenu from "../components/AsideMenu";
import Header from "../components/Header";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { CustomerListToolbar } from "../components/costumer-list-toolbar";
import { CustomerListResults } from "../components/customer-list-result";
import { customers } from "../__mocks__/customers";

var productos;

class Productos extends React.Component {
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


  



  
  render() {
    return (
      <>
        <Header GetIds={this.GetIds}></Header>
        <AsideMenu></AsideMenu>

        {/* <title>
        Customers | Material Kit
      </title> */}

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
          <Container maxWidth={false}>
            <CustomerListToolbar />
            <Box sx={{ mt: 3 }}>
              <CustomerListResults customers={customers} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}

export default Productos;
