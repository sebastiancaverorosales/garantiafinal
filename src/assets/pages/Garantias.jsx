import React from "react";
import AsideMenu from "../components/AsideMenu";
import Header from "../components/Header";
import {
  Box
} from '@mui/material';
import { Container } from '@mui/system';
import { GarantiasListToolbar } from '../components/garantias-toolbar';
import { GarantiasResult } from '../components/garantias-result';
import { garantias } from '../__mocks__/garantias';






class Garantias extends React.Component {
  constructor(props) {
   super(props);
  }
  state = {
    
  };
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
        <Header  GetIds={this.GetIds}></Header>
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
            <GarantiasListToolbar />
            <Box sx={{ mt: 3 }}
            >
              <GarantiasResult garantias={garantias} />
            </Box>
          </Container>
        </Box>
       
    

      
       
      </>
    );
  }
}

export default Garantias;
