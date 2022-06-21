import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

import client from "api/client";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const sendResetPassword = async (values, formikActions) => {
    try {
      const res = await client.post("/resetPassword", {
        password: values.password,
        token: searchParams.get("token"),
        userId: searchParams.get("id"),
      });
      if (res.data) {
        formikActions.resetForm();
        navigate("/login");
      } else {
        setError(true);
        formikActions.setSubmitting(false);
        formikActions.setErrors({
          password: "Token is expired or invalid",
          confirmPassword: "Token is expired or invalid",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .trim()
        .min(8, "Password is too short!")
        .required("Password is required!"),
      confirmPassword: Yup.string().equals(
        [Yup.ref("password"), null],
        "Password does not match!"
      ),
    }),
    onSubmit: (values, formikActions) => {
      sendResetPassword(values, formikActions);
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
                {error && (
                  <>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      <strong>Token is expired or invalid</strong>
                    </Alert>
                    <br />
                  </>
                )}
              </Stack>
              <Typography
                color="textPrimary"
                variant="h4"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Reset Password
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              label="Password *"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
              fullWidth
            />
            <br />
            <TextField
              error={Boolean(
                formik.touched.confirmPassword && formik.errors.confirmPassword
              )}
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              label="Confirm Password *"
              margin="normal"
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirmPassword}
              variant="outlined"
              fullWidth
            />
            <br />

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

export default ResetPassword;
