
import React from "react";
import { AddRestaurant, Header, RestaurantList } from "../component";

const Home = () => {
  return (
    <div>
      <Header/>
      <AddRestaurant/>
      <RestaurantList/>
    </div>
  )
};

export default Home;
