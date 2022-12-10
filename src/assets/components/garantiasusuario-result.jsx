import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { format } from "date-fns";
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
//import {getInitials} from '../../utils/get-initials';

export const GarantiasResultUsuario = ({ garantiausuarios, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = garantiausuarios.map(
        (garantiausuario) => garantiausuario.id
      );
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
  function PedirRenovacion(id) {
 
    fetch(Api + "cruds/products/?pedirrenovacion", {
      method: "POST",
      body: JSON.stringify(id)
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        window.alert("Petición Enviada");
        window.location.reload();
      })
      .catch(console.log());
  }
  function mostrarEstadoOAccion(estado, tipo, fechaGarantia, idgarantia){
    if (tipo == "Dinámica") {
      var f = new Date();
      var fechaHoyString =
        f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
      var fechaHoyDate = new Date(fechaHoyString);
      var fechaDataDate = new Date(fechaGarantia + "T00:00:00");
      if (fechaHoyDate > fechaDataDate) {
        if (estado == 1) {
          return(
            <>
              <p>Esperando Renovación.</p>
            </>
          );
        }else{
          return(
            <>
              <button type="button" className="btn btn-success" onClick={()=>PedirRenovacion(idgarantia)}>Renovar</button>
            </>
          );
        }
        
      }else{
        return(
          <>
            <p>En Función</p>
          </>
        );
      }
    }else{
      var f = new Date();
      var fechaHoyString =
        f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
      var fechaHoyDate = new Date(fechaHoyString);
      var fechaDataDate = new Date(fechaGarantia + "T00:00:00");
      if (fechaHoyDate > fechaDataDate) {
        return(
          <>
            <p>Vencida</p>
          </>
        );
      }else{
        return(
          <>
            <p>En Función</p>
          </>
        );
      }
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
                <TableCell>Acciones y Estado</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {garantiausuarios.slice(0, limit).map((garantiausuario) => (
                <TableRow
                  hover
                  key={garantiausuario.id}
                  selected={
                    selectedCustomerIds.indexOf(garantiausuario.id) !== -1
                  }
                >
                  <TableCell>{garantiausuario.id}</TableCell>
                  <TableCell>{garantiausuario.Usuario}</TableCell>
                  <TableCell>{garantiausuario.Tipo}</TableCell>
                  <TableCell>{garantiausuario.Producto}</TableCell>
                  <TableCell>{garantiausuario.Fecha}</TableCell>
                  <TableCell>{mostrarEstadoOAccion(garantiausuario.Estado, garantiausuario.Tipo, garantiausuario.Fecha, garantiausuario.id)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={garantiausuarios.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

GarantiasResultUsuario.propTypes = {
  garantiausuarios: PropTypes.array.isRequired,
};
