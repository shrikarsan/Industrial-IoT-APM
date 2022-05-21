import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Layout from "components/Layout";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(id, name, noOfSensors, actuator, status) {
  return { id, name, noOfSensors, actuator, status };
}

const rows = [
  createData("MC1001", "Slotting Machine", 3, true, "Good"),
  createData("MC3007", "Grinder Machine", 2, false, "Good"),
  createData("MC6002", "Lathe Machine", 4, true, "Good"),
  createData("MC4003", "Compressor Machine", 1, false, "Good"),
];

const Machines = () => {
  return (
    <Layout title="Machines">
      <Typography>List of machines in the factory</Typography>
      <br />
      <Button
        variant="contained"
        href="machines/add"
        endIcon={<AddRoundedIcon />}
        sx={{ backgroundColor: "#0466c8" }}
      >
        Add machine
      </Button>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Machine ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>No of Sensors</StyledTableCell>
              <StyledTableCell>Actuator</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell colSpan={1} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.noOfSensors}</TableCell>
                <TableCell>{row.actuator ? "Present" : "Absent"}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Machines;
