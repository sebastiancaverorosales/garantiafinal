import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { format } from "date-fns";

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

export const PedidosResultUsuario = ({ pedidousuarios, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = pedidousuarios.map(
        (pedidousuario) => pedidousuario.id
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
  function mostrarEstado(num){
    if (num == 0) {
      return(<p style={{color: "yellow", WebkitTextStroke: 0.25 +"px black"}}>Pendiente</p>);
    }else if (num==1){
      return(<p style={{color: "green"}}>Aceptado</p>);
    }else{
      return(<p style={{color: "red"}}>Denegado</p>);
    }
  }
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id Pedido</TableCell>
                <TableCell>Id Usuario</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Total a pagar</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {pedidousuarios.slice(0, limit).map((pedidousuario) => (
                <TableRow
                  hover
                  key={pedidousuario.id}
                  selected={
                    selectedCustomerIds.indexOf(pedidousuario.id) !== -1
                  }
                >
                  <TableCell>{pedidousuario.id}</TableCell>
                  <TableCell>{pedidousuario.Usuario}</TableCell>
                  <TableCell>{pedidousuario.Producto}</TableCell>
                  <TableCell>{pedidousuario.Fecha}</TableCell>
                  <TableCell>{pedidousuario.Total}</TableCell>
                  <TableCell>{mostrarEstado(pedidousuario.estado)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={pedidousuarios.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PedidosResultUsuario.propTypes = {
  pedidousuarios: PropTypes.array.isRequired,
};
