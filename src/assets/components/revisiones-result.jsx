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

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const RevisionResult = ({ revisiones, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = revisiones.map((revision) => revisiones.id);
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

  function EditarRevision(data){
    cookies.set("editarRevisiones", data, { path: "/" });
    window.location.href = "/revisiones/editar";
  }
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id Revisión</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Nombre Cliente</TableCell>
                <TableCell>Apellidos Cliente</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {revisiones.slice(0, limit).map((revision) => (
                <TableRow
                  hover
                  key={revision.id}
                  selected={selectedCustomerIds.indexOf(revision.id) !== -1}
                >
                  <TableCell>{revision.id}</TableCell>
                  <TableCell>{revision.nombreProducto}</TableCell>
                  <TableCell>{revision.nombre}</TableCell>
                  <TableCell>
                    {revision.ApPaterno + " " + revision.ApMaterno}
                  </TableCell>
                  <TableCell>{revision.Descripcion}</TableCell>
                  <TableCell>
                    <button id={revision.id} type="button" className="btn btn-warning" onClick={() => EditarRevision(revision)}>
                      Editar
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
        count={revisiones.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RevisionResult.propTypes = {
  revisiones: PropTypes.array.isRequired,
};
