import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Stack,
  AlertTitle,
} from "@mui/material";

import { useLogin } from "context/Login";
import client from "api/client";

const ForgotPassword = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const navigate = useNavigate();
  const [success, setSuccess] = useState();

  const sendResetRequest = async (values, formikActions) => {
    try {
      const res = await client.post("/requestResetPassword", {
        ...values,
      });

      if (res.data.success) {
        setSuccess(true);
        console.log(res.data);
        console.log(res.data.link);
        formikActions.resetForm();
      } else {
        setSuccess(false);
        formikActions.setSubmitting(false);
        formikActions.setErrors({
          email: "Invalid email",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
    }),
    onSubmit: (values, formikActions) => {
      sendResetRequest(values, formikActions);
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
              <Stack sx={{ width: "100%" }} spacing={2}>
                {success && (
                  <>
                    <Alert severity="info">
                      <AlertTitle>Success</AlertTitle>
                      Reset password link sent successfully
                      <br />
                      <strong>check it out!</strong>
                    </Alert>
                    <br />
                  </>
                )}
                {success === false && (
                  <>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      <strong> Invalid E-mail !!! </strong>
                    </Alert>
                    <br />
                  </>
                )}
              </Stack>
              <Typography
                color="textPrimary"
                variant="h4"
                align="center"
                // fontFamily="Poppins"
                sx={{ fontWeight: "bold" }}
              >
                Forgot Password
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
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </div>
  );
};

export default ForgotPassword;
