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
import { GetSensorsContext } from "context/Sensors";
import { useNavigate } from "react-router-dom";

function createData(
  id,
  name,
  type,
  unit,
  currentValue,
  upperThresholdValue,
  lowerThresholdValue,
  machineId
) {
  return {
    id,
    name,
    type,
    unit,
    currentValue,
    upperThresholdValue,
    lowerThresholdValue,
    machineId,
  };
}

const rows = [
  createData(
    "SN0001",
    "LM35",
    "Temperature",
    "Celsius",
    1200,
    1500,
    1000,
    "MC0001"
  ),
  createData(
    "SN0002",
    "Thermistor",
    "Temperature",
    "Kelvin",
    700,
    1500,
    500,
    "MC0001"
  ),
  createData(
    "SN0003",
    "Sealed Pressure Sensor",
    "Pressure",
    "Pascal",
    3000,
    5000,
    2500,
    "MC0001"
  ),
];

const Sensors = () => {
  const navigate = useNavigate();
  const { allSensors, getAllSensors } = useContext(GetSensorsContext);

  useEffect(() => {
    getAllSensors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Sensors">
      <Typography>List of sensors in the factory</Typography>

      <br />
      <Button
        variant="contained"
        href="sensors/add"
        endIcon={<AddRoundedIcon />}
        sx={{ backgroundColor: "#0466c8" }}
      >
        Add sensor
      </Button>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {[
                "Sensor ID",
                "Name",
                "Type",
                "Unit",
                "Current Value",
                "Upper Threshold",
                "Lower Threshold",
                "Machine ID",
              ].map((item) => (
                <StyledTableCell>{item}</StyledTableCell>
              ))}
              <StyledTableCell colSpan={1} />
            </TableRow>
          </TableHead>
          <TableBody>
            {(allSensors !== undefined ? allSensors.data : []).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>
                  {row.currentValue !== undefined ? row.currentValue : "-"}
                </TableCell>
                <TableCell>
                  {row.upperThresholdValue !== undefined
                    ? row.upperThresholdValue
                    : "-"}
                </TableCell>
                <TableCell>
                  {row.lowerThresholdValue !== undefined
                    ? row.lowerThresholdValue
                    : "-"}
                </TableCell>
                <TableCell>{row.machineId}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    onClick={() => navigate(`/sensor/${row.id}`)}
                  >
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

export default Sensors;
