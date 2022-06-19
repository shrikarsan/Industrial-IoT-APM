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

const Machine = () => {
  const { machineId } = useParams();
  const [machine, setMachine] = useState();

  useEffect(() => {
    getMachine(machineId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMachine = async (machineId) => {
    try {
      const res = await client.get(`/machine/${machineId}`);
      if (res.data.success) {
        setMachine(res.data.data);
        console.log(res.data.data);
      }
    } catch (err) {
      console.log("Unable to get user");
    }
  };

  const isIsoDate = (str) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    var d = new Date(str);
    return d.toISOString() === str;
  };

  const Info = ({ detail, value }) => {
    if (value !== "" && value !== undefined && value !== null) {
      return (
        <TableRow>
          <TableCell component="th" scope="row">
            <Typography sx={{ fontWeight: "bold" }}>{detail}</Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {isIsoDate(value) ? value.substring(0, 10) : value}
            </Typography>
          </TableCell>
        </TableRow>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Layout title="Machine">
      <Typography sx={{ fontWeight: "bold" }}>Machine Information</Typography>
      <br />
      {machine && (
        <>
          <TableContainer
            component={Paper}
            sx={{ width: "50%", minWidth: 500 }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <Info detail="Machine ID" value={machine.id} />
                <Info detail="Name" value={machine.name} />
                <Info detail="Status" value={machine.status} />
                <Info detail="No of Sensors" value={machine.noOfSensors} />
                <Info detail="Purchased Date" value={machine.purchasedDate} />
                <Info
                  detail="Last Maintenance Date"
                  value={machine.lastMaintenance}
                />
                <Info detail="Actuator ID" value={machine.actuatorId} />
                <Info detail="Actuator Name" value={machine.actuatorName} />
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Button
            variant="contained"
            href={`/machine/update/${machineId}`}
            endIcon={<EditRoundedIcon />}
            sx={{ backgroundColor: "#0466c8" }}
          >
            Update Machine
          </Button>
        </>
      )}
    </Layout>
  );
};

export default Machine;
