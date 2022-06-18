import { useParams } from "react-router-dom";

import { Button, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import Layout from "components/Layout";

const Machine = () => {
  const { machineId } = useParams();
  return (
    <Layout title="Machine">
      <Typography>Machine - {machineId}</Typography>
      <br />
      <Button
        variant="contained"
        href={`/machine/update/${machineId}`}
        endIcon={<EditRoundedIcon />}
        sx={{ backgroundColor: "#0466c8" }}
      >
        Update machine
      </Button>
      <br />
    </Layout>
  );
};

export default Machine;
