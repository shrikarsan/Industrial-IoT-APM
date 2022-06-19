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

import { GetUsersContext } from "context/Users";
import { useNavigate } from "react-router-dom";

function createData(id, firstName, lastName, email, role) {
  return { id, firstName, lastName, email, role };
}

const rowHeaders = ["User ID", "First Name", "Last Name", "Email", "Role"];
const rows = [
  createData("SP001", "David", "Williams", "davidw@ifs.com", "supervisor"),
  createData("MN002", "John", "Stephen", "johns@ifs.com", "manager"),
  createData("SP002", "Adam", "Smith", "adams@ifs.com", "supervisor"),
  createData("SP003", "Mike", "Hudson", "mikeh@ifs.com", "supervisor"),
  createData("SP006", "Arthur", "Clarke", "arthurc@ifs.com", "supervisor"),
];

const Users = () => {
  const navigate = useNavigate();
  const { allUsers, getAllUsers } = useContext(GetUsersContext);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Users">
      <Typography>List of users in the factory</Typography>
      <br />
      <Button
        variant="contained"
        href="users/add"
        endIcon={<AddRoundedIcon />}
        sx={{ backgroundColor: "#0466c8" }}
      >
        Add User
      </Button>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {rowHeaders.map((item) => (
                <StyledTableCell>{item}</StyledTableCell>
              ))}
              <StyledTableCell colSpan={1} />
            </TableRow>
          </TableHead>
          <TableBody>
            {(allUsers !== undefined ? allUsers.data : []).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    onClick={() => navigate(`/user/${row.id}`)}
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

export default Users;
