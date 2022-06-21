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

const Machine = () => {
  const navigate = useNavigate();
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
      console.log("Unable to get machine");
    }
  };

  const handleDelete = async () => {
    const res = await client.post("/delete-machine", {
      id: machineId,
    });
    if (res.data.success) {
      console.log(res.data.message);
      navigate("/machines");
    } else {
      console.log("Delete not successful");
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

          <Button
            variant="contained"
            onClick={() => {
              window.confirm("Are you sure you want to delete this machine?") &&
                handleDelete();
            }}
            endIcon={<DeleteRoundedIcon />}
            sx={{ backgroundColor: "#ef233c", margin: 1 }}
          >
            Delete Machine
          </Button>
        </>
      )}
    </Layout>
  );
};

export default Machine;
