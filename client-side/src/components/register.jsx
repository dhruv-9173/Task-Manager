import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterValidationSchema from './../utils/RegisterValidationSchema'
import useRegister from "../hooks/useRegister";
import Loader from "./Loader";
function Register() {
  const {errors, loading, success, register} = useRegister();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema:RegisterValidationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow-lg h-75" style={{ width: "450px" }}>
        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={formik.handleSubmit}>
          
          <div className="mb-3">
            
            <label htmlFor="name" className="form-label">Name {formik.touched.name && (
            <span className="text-danger">{formik.errors.name}</span>
            )}</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>

        
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email {formik.touched.email && (
                <span className="text-danger">{formik.errors.email}</span>
            )}</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>

          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password {formik.touched.password && (
                <span className="text-danger">{formik.errors.password}</span>
            )}</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>

          
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password {formik.touched.confirmPassword && (
                <span className="text-danger">{formik.errors.confirmPassword}</span>
            )}</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-control"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
          </div>

          <div className="text-danger">{errors}</div>
          <div className="d-grid">
            {loading ? <Loader/> : <button type="submit" className="btn btn-primary">
              Register
            </button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
