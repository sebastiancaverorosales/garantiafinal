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
import { getInitials } from "../../utils/get-initials";
import Api from "../services/Api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const ProductosResultUsuario = ({ productousuarios, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = productousuarios.map(
        (productousuario) => productousuario.id
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

  function Adquirir(id, producto, precio, stock) {
    if (stock > 0) {
      if (
        window.confirm(
          "¿Desea adquirir una unidad del producto: " + producto + " ?"
        )
      ) {
        var f = new Date();
        var fechaHoyString =
          f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();

        var dataSend1 = {
          idUsuario: cookies.get("id_user"),
          idProducto: id,
          idPedido: (
            parseInt(cookies.get("cantidades")[0][0]["COUNT(*)"], 10) + 1
          ).toString(),
          total: precio,
          fecha: fechaHoyString,
        };
        var dataSend2 = {
          idProducto: id,
          stock: (parseInt(stock, 10) - 1).toString(),
        };
        fetch(Api + "cruds/products/?adquirir", {
          method: "POST",
          body: JSON.stringify(dataSend1),
        })
          .then((Response) => Response.json())
          .then((dataResponse) => {
            console.log(dataResponse);
            window.alert(producto + " adquirido.");
            window.location.reload();
          })
          .catch(console.log());

        fetch(Api + "cruds/products/?actualizarstock", {
          method: "POST",
          body: JSON.stringify(dataSend2),
        })
          .then((Response) => Response.json())
          .then((dataResponse) => {
            console.log(dataResponse);
          })
          .catch(console.log());
      }
    } else {
      window.alert("No hay Stock disponible.");
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
              {productousuarios.slice(0, limit).map((productousuario) => (
                <TableRow
                  hover
                  key={productousuario.id}
                  selected={
                    selectedCustomerIds.indexOf(productousuario.id) !== -1
                  }
                >
                  <TableCell>{productousuario.id}</TableCell>
                  <TableCell>{productousuario.nombre}</TableCell>
                  <TableCell>{productousuario.descripcion}</TableCell>
                  <TableCell>{productousuario.stock}</TableCell>
                  <TableCell>{productousuario.precio}</TableCell>
                  <TableCell>{productousuario.marca}</TableCell>
                  <TableCell>{productousuario.categoria}</TableCell>
                  <TableCell>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        Adquirir(
                          productousuario.id,
                          productousuario.nombre,
                          productousuario.precio,
                          productousuario.stock
                        )
                      }
                    >
                      Adquirir
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
        count={productousuarios.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProductosResultUsuario.propTypes = {
  productousuarios: PropTypes.array.isRequired,
};
