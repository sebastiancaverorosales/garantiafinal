import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { format } from "date-fns";
import $ from "jquery";
import Api from "../services/Api";

import {
  Button,
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import Cookies from "universal-cookie";
import * as XLSX from "xlsx/xlsx.mjs";

const cookies = new Cookies();

export const AnalistaResult = ({ analistas, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = analistas.map((analista) => analistas.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  function EliminarAnalista(id) {
    var registro = $("#" + id)
      .parent()
      .parent();
    if (window.confirm("¿Desea eliminar al analista: " + id + " ?")) {
      registro.hide();
      fetch(Api + "cruds/usuarios/?eliminar", {
        method: "POST",
        body: JSON.stringify(id),
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
          window.alert("Registro: " + id + " eliminado.");
          fetch(Api + "cruds/usuarios/?listaranalistas", {
            method: "POST",
          })
            .then((Response) => Response.json())
            .then((dataResponse) => {
              cookies.set("analistas", dataResponse, { path: "/" });
            })
            .catch(console.log());
        })
        .catch(console.log());
    }

    console.log();
  }
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido Paterno</TableCell>
                <TableCell>Apellido Materno</TableCell>
                <TableCell>Dni</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Género</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {analistas.slice(0, limit).map((analista) => (
                <TableRow
                  hover
                  key={analista.id}
                  selected={selectedCustomerIds.indexOf(analista.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {analista.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{analista.nombre}</TableCell>
                  <TableCell>{analista.ApePaterno}</TableCell>

                  <TableCell>{analista.ApeMaterno}</TableCell>
                  <TableCell>{analista.DNI}</TableCell>
                  <TableCell>{analista.Direccion}</TableCell>
                  <TableCell>{analista.Celular}</TableCell>
                  <TableCell>{analista.Genero}</TableCell>
                  <TableCell>
                    <button
                      type="button"
                      id={analista.id}
                      className="btn btn-danger"
                      onClick={() => EliminarAnalista(analista.id)}
                    >
                      Eliminar
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={analistas.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AnalistaResult.propTypes = {
  analistas: PropTypes.array.isRequired,
};
