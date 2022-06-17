import { useParams } from "react-router-dom";

import { Button, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import Layout from "components/Layout";

const Sensor = () => {
  const { sensorId } = useParams();
  return (
    <Layout title="Sensor">
      <Typography>Sensor - {sensorId}</Typography>
      <br />
      <Button
        variant="contained"
        href={`/sensor/update/${sensorId}`}
        endIcon={<EditRoundedIcon />}
        sx={{ backgroundColor: "#0466c8" }}
      >
        Update sensor
      </Button>
      <br />
    </Layout>
  );
};

export default Sensor;
