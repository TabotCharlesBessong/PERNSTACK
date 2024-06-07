import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const {authUser,isLoading} = useAuthContext()
  if(isLoading) return <h1>Loading.....</h1>
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
