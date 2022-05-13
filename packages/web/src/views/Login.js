import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "user@factory.com",
      password: "12345678",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      navigate("/dashboard");
    },
  });

  return (
    <div>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ my: 8 }}></Box>
        <Container
          maxWidth="sm"
          sx={{
            bgcolor: "white",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 5 }}>
              <Typography
                color="textPrimary"
                variant="h4"
                align="center"
                // fontFamily="Poppins"
              >
                Login
              </Typography>
            </Box>
            {/* <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h6">
                Login to your account
              </Typography>
            </Box> */}

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box
              sx={{ py: 5 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                sx={{ maxWidth: "400px" }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </div>
  );
};

export default Login;
