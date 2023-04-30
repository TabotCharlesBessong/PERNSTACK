import React from "react";

import {Home,UpdatePage,RestaurantDetailPage} from './pages'
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route
              exact
              path="/restaurants/:id/update"
              element={<UpdatePage/>}
            />
            {/* <Route
              exact
              path="/restaurants/:id"
              element={<RestaurantDetailPage/>}
            /> */}
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
