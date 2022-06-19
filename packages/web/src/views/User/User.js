import { useParams } from "react-router-dom";

import { Button, Typography } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import Layout from "components/Layout";

const User = () => {
  const { userId } = useParams();
  return (
    <Layout title="User">
      <Typography>User - {userId}</Typography>
      <br />
      <Button
        variant="contained"
        href={`/user/update/${userId}`}
        endIcon={<EditRoundedIcon />}
        sx={{ backgroundColor: "#0466c8" }}
      >
        Update user
      </Button>
      <br />
    </Layout>
  );
};

export default User;
