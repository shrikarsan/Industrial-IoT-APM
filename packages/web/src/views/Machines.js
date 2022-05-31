import { useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Layout from "components/Layout";
import { Typography } from "@mui/material";

import StyledTableCell from "components/StyledTableCell";
import { GetMachinesContext } from "context/Machines";

function createData(id, name, noOfSensors, actuatorId, status) {
  return { id, name, noOfSensors, actuatorId, status };
}

const rows = [
  createData("MC1001", "Slotting Machine", 3, "AT0001", "Good"),
  createData("MC3007", "Grinder Machine", 2, "AT0004", "Good"),
  createData("MC6002", "Lathe Machine", 4, "AT0003", "Good"),
  createData("MC4003", "Compressor Machine", 1, undefined, "Good"),
];

const Machines = () => {
  const { allMachines, getAllMachines } = useContext(GetMachinesContext);

  useEffect(() => {
    getAllMachines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {[
                "Machine ID",
                "Name",
                "No of Sensors",
                "Actuator",
                "Status",
              ].map((item) => (
                <StyledTableCell>{item}</StyledTableCell>
              ))}
              <StyledTableCell colSpan={1} />
            </TableRow>
          </TableHead>
          <TableBody>
            {(allMachines !== undefined ? allMachines.data : []).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.noOfSensors}</TableCell>
                <TableCell>
                  {row.actuatorId !== undefined ? "Present" : "Absent"}
                </TableCell>
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
