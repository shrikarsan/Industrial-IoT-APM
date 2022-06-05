import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

import Layout from "components/Layout";
import client from "api/client";

const AddSensor = () => {
  const navigate = useNavigate();

  const createSensor = async (values, formikActions) => {
    const res = await client.post("/create-sensor", {
      ...values,
    });

    if (res.data.success) {
      console.log("Sensor created successfully");
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      type: "",
      unit: "",
      upperThresholdValue: undefined,
      lowerThresholdValue: undefined,
      machineId: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("ID is required"),
      name: Yup.string().required("Name is required"),
      type: Yup.string().required("Type is required"),
      unit: Yup.string().required("Unit is required"),
      machineId: Yup.string().required("Machine id is required"),
    }),
    onSubmit: (values, formikActions) => {
      createSensor(values, formikActions);
      navigate("/sensors");
    },
  });

  return (
    <Layout title="Add Sensor">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            error={Boolean(formik.touched.id && formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
            label="Sensor ID *"
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

          <TextField
            error={Boolean(formik.touched.type && formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
            label="Type *"
            margin="normal"
            name="type"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.type}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(formik.touched.unit && formik.errors.unit)}
            helperText={formik.touched.unit && formik.errors.unit}
            label="Unit *"
            margin="normal"
            name="unit"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.unit}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(
              formik.touched.upperThresholdValue &&
                formik.errors.upperThresholdValue
            )}
            helperText={
              formik.touched.upperThresholdValue &&
              formik.errors.upperThresholdValue
            }
            label="Upper Threshold Value"
            margin="normal"
            name="upperThresholdValue"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.upperThresholdValue}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(
              formik.touched.lowerThresholdValue &&
                formik.errors.lowerThresholdValue
            )}
            helperText={
              formik.touched.lowerThresholdValue &&
              formik.errors.lowerThresholdValue
            }
            label="Lower Threshold Value"
            margin="normal"
            name="lowerThresholdValue"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.lowerThresholdValue}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
          <br />

          <TextField
            error={Boolean(formik.touched.machineId && formik.errors.machineId)}
            helperText={formik.touched.machineId && formik.errors.machineId}
            label="Machine ID *"
            margin="normal"
            name="machineId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.machineId}
            variant="outlined"
            sx={{ minWidth: "400px" }}
          />
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
            Add sensor
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default AddSensor;
