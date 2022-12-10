import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
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
import { getInitials } from "../../utils/get-initials";

import $ from "jquery";
import Api from "../services/Api";

import Cookies from "universal-cookie";

const cookies = new Cookies();


export const CustomerListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
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

  function EliminarProducto(id) {
    var registro = $("#" + id)
      .parent()
      .parent();
    if (window.confirm("¿Desea eliminar al analista: " + id.slice(1) + " ?")) {
      registro.hide();
      fetch(Api + "cruds/products/?eliminarproducto", {
        method: "POST",
        body: JSON.stringify(id.slice(1)),
      })
        .then((Response) => Response.json())
        .then((dataResponse) => {
          window.alert("Registro: " + id.slice(1) + " eliminado.");
          fetch(Api + "cruds/products/?listarproductos", {
            method: "POST",
          })
            .then((Response) => Response.json())
            .then((dataResponse) => {
              cookies.set("productos", dataResponse, { path: "/" });
            })
            .catch(console.log());
        })
        .catch(console.log());
    }
  }

  function EditarProducto(data) {
    cookies.set("editarProductos", data, {path : "/"});
    window.location.href = "/productos/editar";
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.nombre}</TableCell>
                  <TableCell>{customer.descripcion}</TableCell>
                  <TableCell>{customer.stock}</TableCell>
                  <TableCell>{customer.precio}</TableCell>
                  <TableCell>{customer.marca}</TableCell>
                  <TableCell>{customer.categoria}</TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      id={"E" + customer.id}
                      type="button"
                      className="btn btn-warning"
                      onClick={() => EditarProducto(customer)}
                    >
                      Editar
                    </button>
                    <button
                      id={"D" + customer.id}
                      type="button"
                      className="btn btn-danger"
                      onClick={() => EliminarProducto("D" + customer.id)}
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
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
