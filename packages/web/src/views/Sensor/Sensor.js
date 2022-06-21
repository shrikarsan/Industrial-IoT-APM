import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import Layout from "components/Layout";
import client from "api/client";

const Sensor = () => {
  const navigate = useNavigate();
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

  const handleDelete = async () => {
    const res = await client.post("/delete-sensor", {
      id: sensorId,
    });
    if (res.data.success) {
      console.log(res.data.message);
      navigate("/sensors");
    } else {
      console.log("Delete not successful");
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
      <Typography sx={{ fontWeight: "bold" }}>Sensor Information</Typography>
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
          <Button
            variant="contained"
            onClick={() => {
              window.confirm("Are you sure you want to delete this sensor?") &&
                handleDelete();
            }}
            endIcon={<DeleteRoundedIcon />}
            sx={{ backgroundColor: "#ef233c", margin: 1 }}
          >
            Delete Sensor
          </Button>
        </>
      )}
    </Layout>
  );
};

export default Sensor;
