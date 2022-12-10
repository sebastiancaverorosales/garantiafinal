import React from "react";
import AsideMenu from "../components/AsideMenu";
import Header from "../components/Header";
import {
  Box
} from '@mui/material';
import { Container } from '@mui/system';
import { RevisionResult } from '../components/revisiones-result';
import { RevisionListToolbar } from '../components/revisiones-toolbar';
import { revisiones } from '../__mocks__/revisiones';





class Revisiones extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {



  }
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
            <RevisionListToolbar />
            <Box sx={{ mt: 3 }}
            >
              <RevisionResult revisiones={revisiones} />
            </Box>
          </Container>
        </Box>
      
        




      </>
    );
  }
}

export default Revisiones;