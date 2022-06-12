import { useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Layout from "components/Layout";
import { Typography } from "@mui/material";

import StyledTableCell from "components/StyledTableCell";
import { GetSensorReadingsContext } from "context/SensorReadings";

const Alerts = () => {
  const { allAlerts, getAllAlerts } = useContext(GetSensorReadingsContext);

  useEffect(() => {
    getAllAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Alerts">
      <Typography>List of all alerts</Typography>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {["No", "Machine", "Sensor", "Description"].map((item) => (
                <StyledTableCell>{item}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(allAlerts !== undefined ? allAlerts.data : []).map(
              (row, index) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.machine}</TableCell>
                  <TableCell>{row.sensor}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Alerts;
