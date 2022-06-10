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

const Dashboard = () => {
  const { allSensorReadings, getAllSensorReadings } = useContext(
    GetSensorReadingsContext
  );

  useEffect(() => {
    getAllSensorReadings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Dashboard">
      <Typography sx={{ fontWeight: "bold" }}>
        Recent sensor readings
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {[
                "Sensor ID",
                "Reading",
                "Unit",
                "Date",
                "Time",
                "Machine ID",
              ].map((item) => (
                <StyledTableCell>{item}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(allSensorReadings !== undefined
              ? allSensorReadings.data.slice(0, 15)
              : []
            ).map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.sensorId}
                </TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>{row.time.substring(0, 10)}</TableCell>
                <TableCell>{row.time.substring(11, 19)}</TableCell>
                <TableCell>{row.machineId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Dashboard;
