import Auth from "./pages/auth";
import Login from "./components/login";
import Dashboard from "./pages/Dashboard";
import 'react-bootstrap';
import {BrowserRouter as Router, Routes,Route, useNavigate} from 'react-router-dom';
import Register from "./components/register";
import Header from "./components/header";
import useAuthContext from "./hooks/useAuthContext";
function App()
{ 
  const {isAuthenticated} = useAuthContext();
  return (
    
    <>
    <Router>
        <Routes>
          <Route path="/" element={ <Dashboard/> }/>
          <Route path="/auth" element={<Auth/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;