import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";

const App = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-center text-2xl text-orange-700">
                Hello people
              </h1>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
