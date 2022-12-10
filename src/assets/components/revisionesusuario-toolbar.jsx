import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { Upload as UploadIcon } from "@mui/icons-material";
import { Download as DownloadIcon } from "@mui/icons-material";
import Cookies from "universal-cookie";

const cookies = new Cookies();

var jsondata = cookies.get("reportesusuario");

export const RevisionListToolbarUsuario = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Tus Revisiones
      </Typography>
    </Box>
  </Box>
);
