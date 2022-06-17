import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

import Layout from "components/Layout";
import client from "api/client";

const UpdateSensor = () => {
  const { sensorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSensor(sensorId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSensor = async (sensorId) => {
    try {
      const res = await client.get(`/sensor/${sensorId}`);
      if (res.data.success) {
        formik.setFieldValue("id", res.data.data.id);
        formik.setFieldValue("name", res.data.data.name);
        formik.setFieldValue("type", res.data.data.type);
        formik.setFieldValue("unit", res.data.data.unit);
        formik.setFieldValue(
          "upperThresholdValue",
          res.data.data.upperThresholdValue
        );
        formik.setFieldValue(
          "lowerThresholdValue",
          res.data.data.lowerThresholdValue
        );
        formik.setFieldValue("machineId", res.data.data.machineId);
      }
    } catch (err) {
      console.log("Unable to get sensor");
    }
  };

  const updateSensor = async (values, formikActions) => {
    const res = await client.put("/sensors", {
      ...values,
    });

    if (res.data.success) {
      console.log("Sensor updated successfully");
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
    navigate(`/sensor/${sensorId}`);
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
      id: Yup.string()
        .min(6, "ID should contain at least 6 characters")
        .required("ID is required"),
      name: Yup.string().required("Name is required"),
      type: Yup.string().required("Type is required"),
      unit: Yup.string().required("Unit is required"),
      machineId: Yup.string().required("Machine id is required"),
    }),
    onSubmit: (values, formikActions) => {
      updateSensor(values, formikActions);
    },
  });

  return (
    <Layout title="Update Sensor">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            disabled={true}
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
            Update sensor
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateSensor;
