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

const User = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    getUser(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async (userId) => {
    try {
      const res = await client.get(`/user/${userId}`);
      if (res.data.success) {
        setUser(res.data.data);
        console.log(res.data.data);
      }
    } catch (err) {
      console.log("Unable to get user");
    }
  };

  const Info = ({ detail, value }) => {
    if (value !== "") {
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
    <Layout title="User">
      <Typography sx={{ fontWeight: "bold" }}>User Information</Typography>
      <br />
      {user && (
        <>
          <TableContainer
            component={Paper}
            sx={{ width: "50%", minWidth: 500 }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <Info detail="User ID" value={user.id} />
                <Info detail="Role" value={user.role} />
                <Info detail="First Name" value={user.firstName} />
                <Info detail="Last Name" value={user.lastName} />
                <Info detail="Email" value={user.email} />
                <Info detail="Managed By" value={user.managedBy} />
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <Button
            variant="contained"
            href={`/user/update/${userId}`}
            endIcon={<EditRoundedIcon />}
            sx={{ backgroundColor: "#0466c8" }}
          >
            Update User
          </Button>
        </>
      )}
    </Layout>
  );
};

export default User;
