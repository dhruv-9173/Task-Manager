import Auth from "./pages/auth";
import Login from "./components/login";
import Dashboard from "./pages/Dashboard";
import "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import useAuthContext from "./hooks/useAuthContext.jsx";
function App() {
  const { isAuthenticated } = useAuthContext();
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Provider store={store}>
                  <Dashboard />
                </Provider>
              ) : (
                <Auth />
              )
            }
          />
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
