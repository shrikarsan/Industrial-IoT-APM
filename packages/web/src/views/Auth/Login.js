import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Alert,
} from "@mui/material";

import { useLogin } from "context/Login";
import client from "api/client";

const Login = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const navigate = useNavigate();

  const loginUser = async (values, formikActions) => {
    try {
      const res = await client.post("/login", {
        ...values,
      });

      if (res.data.success) {
        setProfile(res.data.user);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log(res.data);
        formikActions.resetForm();
        navigate("/dashboard");
      } else {
        formikActions.setSubmitting(false);
        formikActions.setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Should contain at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, formikActions) => {
      loginUser(values, formikActions);
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
          maxWidth="xs"
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
                sx={{ fontWeight: "bold" }}
              >
                Login
              </Typography>
            </Box>

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
            <br />
            <Box
              sx={{ py: 1 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Link href="/forgot" sx={{ textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </Box>
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
