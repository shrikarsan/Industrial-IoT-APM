import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  MenuItem,
  // Autocomplete,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import Layout from "components/Layout";

const AddMachine = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      status: "Good",
      purchasedDate: "",
      lastMaintenance: "",
      isActuatorPresent: false,
      actuatorid: "",
      actuatorname: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("ID is required"),
      name: Yup.string().required("Name is required"),
      isActuatorPresent: Yup.boolean(),
      actuatorid: Yup.string().when("isActuatorPresent", {
        is: true,
        then: Yup.string().required("Actuator ID is required"),
      }),
      actuatorname: Yup.string().when("isActuatorPresent", {
        is: true,
        then: Yup.string().required("Actuator name is required"),
      }),
    }),
    onSubmit: () => {
      navigate("/machines");
    },
  });

  return (
    <Layout title="Add Machine">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            error={Boolean(formik.touched.id && formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
            label="Machine ID *"
            margin="normal"
            name="id"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.id}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            label="Name *"
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.name}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />
          <br />

          <TextField
            error={Boolean(formik.touched.status && formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            label="Status"
            margin="normal"
            name="status"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.status}
            variant="outlined"
            sx={{ minWidth: "400px" }}
            id="outlined-select-status"
            select
          >
            {["Good", "Warning", "Danger"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {/* <br />
        <br />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Good", "Warning", "Danger"]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Status" />}
        /> */}
          <br />
          <br />
          <TextField
            error={Boolean(
              formik.touched.purchasedDate && formik.errors.purchasedDate
            )}
            helperText={
              formik.touched.purchasedDate && formik.errors.purchasedDate
            }
            label="Purchased Date"
            margin="normal"
            name="purchasedDate"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="date"
            value={formik.values.purchasedDate}
            variant="outlined"
            sx={{ minWidth: "400px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />

          <TextField
            error={Boolean(
              formik.touched.lastMaintenance && formik.errors.lastMaintenance
            )}
            helperText={
              formik.touched.lastMaintenance && formik.errors.lastMaintenance
            }
            label="Last Maintenance Date"
            margin="normal"
            name="lastMaintenance"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="date"
            value={formik.values.lastMaintenance}
            variant="outlined"
            sx={{ minWidth: "400px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                error={Boolean(
                  formik.touched.isActuatorPresent &&
                    formik.errors.isActuatorPresent
                )}
                helperText={
                  formik.touched.isActuatorPresent &&
                  formik.errors.isActuatorPresent
                }
                name="isActuatorPresent"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                checked={formik.values.isActuatorPresent}
              />
            }
            label="Does it have Actuator"
          />

          {formik.values.isActuatorPresent ? (
            <>
              <br />
              <br />
              <TextField
                error={Boolean(
                  formik.touched.actuatorid && formik.errors.actuatorid
                )}
                helperText={
                  formik.touched.actuatorid && formik.errors.actuatorid
                }
                label="Actuator ID *"
                margin="normal"
                name="actuatorid"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.actuatorid}
                variant="outlined"
                sx={{ minWidth: "400px" }}
              />
              <br />

              <TextField
                error={Boolean(
                  formik.touched.actuatorname && formik.errors.actuatorname
                )}
                helperText={
                  formik.touched.actuatorname && formik.errors.actuatorname
                }
                label="Actuator Name *"
                margin="normal"
                name="actuatorname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.actuatorname}
                variant="outlined"
                sx={{ minWidth: "400px" }}
              />
              <br />
              <br />
            </>
          ) : (
            ""
          )}
          <br />
          <br />

          <Button
            color="primary"
            disabled={formik.isSubmitting}
            sx={{ minWidth: "400px", textTransform: "none" }}
            size="large"
            type="submit"
            variant="contained"
          >
            Add machine
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default AddMachine;
