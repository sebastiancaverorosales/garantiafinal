import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { format } from "date-fns";
import $ from "jquery";
import Api from "../services/Api";
import Cookies from "universal-cookie";

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
//import {getInitials} from '../../utils/get-initials';
const cookies = new Cookies();

export const GarantiasResult = ({ garantias, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = garantias.map((garantia) => garantia.id);
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

  var fechas = [];
  var ids = [];
  var tipos = [];
  var estados = [];

  function Renovar(id, tipo, fechaGarantia, estado) {
    fechas.push(new Date(fechaGarantia + "T00:00:00"));
    ids.push(id);
    tipos.push(tipo);
    estados.push(estado);

    window.onload = function () {
      var f = new Date();
      var fecha =
        f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
      fecha = new Date(fecha);

      for (let i = 0; i < ids.length; i++) {
        if (tipos[i] == "Dinámica") {
          if (fecha > fechas[i]) {
            let boton = document.getElementById("renovarButton" + ids[i]);
            boton.removeAttribute("hidden");
            if (estados[i] == 1) {
              boton.style.border = "4px solid gold";
            }
          }
        }
      }
    };
  }

  function EliminarGarantia(id) {
    if (window.confirm("¿Está Seguro de ELIMINAR esta Garantía?")) {
      let garantia = $("#" + id);
      garantia.attr("hidden", "1");

      fetch(Api + "cruds/products/?eliminargarantía", {
        method: "POST",
        body: JSON.stringify(id),
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          window.alert("Garantía ID: " + id + " eliminada.");
        })
        .catch(console.log());
    }
  }

  function RenovarGarantia(id, fechaGarantia) {
    if (
      window.confirm(
        "¿Está seguro de RENOVAR la garantía ID: " +
          id +
          "\nLa renovación es exclusiva de 6 meses agregados."
      )
    ) {
      var f = new Date();
      var fechaHoyString =
        f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
      var fechaHoyDate = new Date(fechaHoyString);
      var fechaAlter = new Date(fechaGarantia + "T00:00:00")
      if (fechaHoyDate > fechaAlter) {
        var fechaEnviar = fechaHoyString;
      }else{
        var fechaEnviar = fechaGarantia;
      }

      var dia = parseInt(fechaEnviar.slice(8, 10), 10);
      var mes = parseInt(fechaEnviar.slice(5, 7), 10);
      var year = parseInt(fechaEnviar.slice(0, 4), 10);
      if (mes + 6 > 12) {
        mes -= 6;
        year = year + 1;
      } else {
        mes = mes + 6;
      }
      if (dia == 31) {
        if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
          dia = 30;
        } else if (mes == 2) {
          dia = 28;
        }
      } else if (dia == 30) {
        if (mes == 2) {
          dia = 28;
        }
      }
      mes = mes.toString();
      dia = dia.toString();
      if (mes.length == 1) {
        mes = "0" + mes;
      }
      if (dia.length == 1) {
        dia = "0" + dia;
      }
      var fechaSend = year.toString() + "-" + mes + "-" + dia;
      var dataSend = {
        id: id,
        fecha: fechaSend,
      };
      fetch(Api + "cruds/products/?renovargarantia", {
        method: "POST",
        body: JSON.stringify(dataSend),
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
          window.alert("Garantía ID: " + id + " renovada.");
          fetch(Api + "cruds/products/?listargarantias", {
            method: "POST",
          })
            .then((Response) => Response.json())
            .then((dataResponse) => {
              cookies.set("garantias", dataResponse, { path: "/" });
              window.location.reload();
            })
            .catch(console.log());
        })
        .catch(console.log());
    }
  }
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Tipo Garantia</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Fecha de Vencimiento</TableCell>
                <TableCell>Acciones </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {garantias.slice(0, limit).map((garantia) => (
                <TableRow
                  hover
                  key={garantia.id}
                  selected={selectedCustomerIds.indexOf(garantia.id) !== -1}
                  id={garantia.id}
                >
                  <TableCell>{garantia.id}</TableCell>
                  <TableCell>{garantia.Usuario}</TableCell>
                  <TableCell>{garantia.Tipo}</TableCell>
                  <TableCell>{garantia.Producto}</TableCell>
                  <TableCell>{garantia.Fecha}</TableCell>

                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <button
                      id={"renovarButton" + garantia.id}
                      type="button"
                      className="btn btn-success"
                      hidden
                      onLoad={Renovar(
                        garantia.id,
                        garantia.Tipo,
                        garantia.Fecha,
                        garantia.Estado
                      )}
                      onClick={() =>
                        RenovarGarantia(garantia.id, garantia.Fecha)
                      }
                      style={{ marginRight: 16 }}
                    >
                      Renovar
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => EliminarGarantia(garantia.id)}
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
        count={garantias.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

GarantiasResult.propTypes = {
  garantias: PropTypes.array.isRequired,
};
