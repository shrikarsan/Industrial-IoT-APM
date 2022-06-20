import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

import Layout from "components/Layout";
import client from "api/client";

const Sensor = () => {
  const { sensorId } = useParams();
  const [sensor, setSensor] = useState();

  useEffect(() => {
    getSensor(sensorId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSensor = async (sensorId) => {
    try {
      const res = await client.get(`/sensor/${sensorId}`);
      if (res.data.success) {
        setSensor(res.data.data);
        console.log(res.data.data);
      }
    } catch (err) {
      console.log("Unable to get sensor");
    }
  };

  const Info = ({ detail, value }) => {
    if (value !== "" && value !== undefined && value !== null) {
      return (
        <TableRow>
          <TableCell component="th" scope="row">
            <Typography sx={{ fontWeight: "bold" }}>{detail}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{value}</Typography>
          </TableCell>
        </TableRow>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Layout title="Sensor">
      <Typography sx={{ fontWeight: "bold" }}>Machine Information</Typography>
      <br />
      {sensor && (
        <>
          <TableContainer
            component={Paper}
            sx={{ width: "50%", minWidth: 500 }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <Info detail="Sensor ID" value={sensor.id} />
                <Info detail="Name" value={sensor.name} />
                <Info detail="Type" value={sensor.type} />
                <Info detail="Unit" value={sensor.unit} />
                <Info detail="Current Value" value={sensor.currentValue} />
                <Info
                  detail="Upper Threshold Value"
                  value={sensor.upperThresholdValue}
                />
                <Info
                  detail="Lower Threshold Value"
                  value={sensor.lowerThresholdValue}
                />
                <Info detail="Machine ID" value={sensor.machineId} />
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Button
            variant="contained"
            href={`/sensor/update/${sensorId}`}
            endIcon={<EditRoundedIcon />}
            sx={{ backgroundColor: "#0466c8" }}
          >
            Update sensor
          </Button>
        </>
      )}
    </Layout>
  );
};

export default Sensor;
