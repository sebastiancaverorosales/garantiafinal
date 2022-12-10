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

export const PedidosResult = ({ pedidos, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = pedidos.map((pedido) => pedidos.id);
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

  function ActualizarPedido(id, estado) {
    var dataSend = {
      id,
      estado,
    };
    fetch(Api + "cruds/products/?editarpedido", {
      method: "POST",
      body: JSON.stringify(dataSend),
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        if (dataSend["estado"] == 1) {
          window.alert("Pedido Aceptado");
        } else {
          window.alert("Pedido Denegado");
        }
        window.location.reload();
      })
      .catch(console.log());
  }
  function AccionesOrText(estado, id) {
    console.log(estado);
    if (estado == 0) {
      return (
        <>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => ActualizarPedido(id, 1)}
          >
            Aceptar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => ActualizarPedido(id, 2)}
          >
            Denegar
          </button>
        </>
      );
    }else if(estado == 1){
      return(
        <>
          <p>Aceptado</p>
        </>
      )
    }else{
      return(
        <>
          <p>Denegado</p>
        </>
      )
    }
  }
  
  return (

    <Card {...rest} >
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050, }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id Pedido</TableCell>
                <TableCell>Id Usuario</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Total a pagar</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {pedidos.slice(0, limit).map((pedido) => (
                <TableRow
                  hover
                  key={pedido.id}
                  selected={selectedCustomerIds.indexOf(pedido.id) !== -1}
                >
                  <TableCell>{pedido.id}</TableCell>
                  <TableCell>{pedido.Usuario}</TableCell>
                  <TableCell>{pedido.Producto}</TableCell>
                  <TableCell>{pedido.Fecha}</TableCell>
                  <TableCell>{pedido.Total}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {AccionesOrText(pedido.estado, pedido.id)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={pedidos.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PedidosResult.propTypes = {
  pedidos: PropTypes.array.isRequired,
};
