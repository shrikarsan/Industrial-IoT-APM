import { useEffect, useContext, Fragment } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import { Typography, Card, Box, Grid } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SensorsRoundedIcon from "@mui/icons-material/SensorsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import Layout from "components/Layout";
import StyledTableCell from "components/StyledTableCell";

import { GetSensorReadingsContext } from "context/SensorReadings";
import { GetUsersContext } from "context/Users";
import { GetMachinesContext } from "context/Machines";
import { GetSensorsContext } from "context/Sensors";

const InfoCard = ({ children }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="text"
          component="h2"
          sx={{ fontWeight: 400, textAlign: "center" }}
        >
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { allSensorReadings, getAllSensorReadings, allAlerts, getAllAlerts } =
    useContext(GetSensorReadingsContext);
  const { allUsers, getAllUsers } = useContext(GetUsersContext);
  const { allMachines, getAllMachines } = useContext(GetMachinesContext);
  const { allSensors, getAllSensors } = useContext(GetSensorsContext);

  useEffect(() => {
    getAllSensorReadings();
    getAllAlerts();
    getAllUsers();
    getAllMachines();
    getAllSensors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Dashboard">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4} key={1}>
            <InfoCard>
              <GroupRoundedIcon /> &nbsp; Users - {allUsers && allUsers.count}
            </InfoCard>
          </Grid>
          <Grid item xs={2} sm={4} md={4} key={1}>
            <InfoCard>
              <PrecisionManufacturingRoundedIcon /> &nbsp; Machines -{" "}
              {allMachines && allMachines.count}
            </InfoCard>
          </Grid>
          <Grid item xs={2} sm={4} md={4} key={1}>
            <InfoCard>
              <SensorsRoundedIcon /> &nbsp; Sensors -{" "}
              {allSensors && allSensors.count}
            </InfoCard>
          </Grid>
        </Grid>
      </Box>

      <br />

      <Typography sx={{ fontWeight: "bold" }}>Recent Alerts</Typography>
      <br />

      {(allAlerts !== undefined ? allAlerts.data.slice(0, 5) : []).map(
        (alert) => (
          <Alert severity="warning">
            <AlertTitle>Warning - {alert.machine}</AlertTitle>
            {alert.description} in machine {alert.machine}
          </Alert>
        )
      )}
      <br />
      <br />

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
              ? allSensorReadings.data.slice(0, 10)
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
      <br />
      <Button
        variant="contained"
        href="readings"
        startIcon={<EqualizerRoundedIcon />}
        sx={{ textTransform: "none" }}
      >
        View all sensor readings
      </Button>
    </Layout>
  );
};

export default Dashboard;
