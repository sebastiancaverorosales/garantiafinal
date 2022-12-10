import React from "react";
import AsideMenu from "../components/AsideMenu";
import Header from "../components/Header";
import {
  Box
} from '@mui/material';
import { Container } from '@mui/system';
import { AnalistaResult } from '../components/analistas-result';
import { AnalistaListToolbar } from '../components/analistas-toolbar';
import { analistas } from '../__mocks__/analistas';


class EditarAnalista extends React.Component {
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
            <AnalistaListToolbar />
            <Box sx={{ mt: 3 }}
            >
              <AnalistaResult analistas={analistas} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}

export default EditarAnalista;
