import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import useLogin from "../hooks/uselogin";
import Loader from "./Loader";
function Login() {
  const { errors, loading, login } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center ">
      <div className="card p-4 shadow-lg h-50" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>

          <div className="text-danger">{errors}</div>
          <div className="d-grid">
            {loading ? (
              <Loader />
            ) : (
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
