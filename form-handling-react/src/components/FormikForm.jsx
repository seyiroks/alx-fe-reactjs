import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const FormikForm = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Registration (Formik + Yup)</h2>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert("Formik form submitted successfully!");
          console.log("Form values:", values);
        }}
      >
        {() => (
          <Form>
            <div>
              <label>Username:</label>
              <Field name="username" />
              <ErrorMessage
                name="username"
                component="p"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label>Email:</label>
              <Field name="email" type="email" />
              <ErrorMessage
                name="email"
                component="p"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label>Password:</label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                component="p"
                style={{ color: "red" }}
              />
            </div>

            <button type="submit" style={{ marginTop: "10px" }}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
