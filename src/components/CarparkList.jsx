import { useEffect, useState } from "react";
import * as CarparkService from "../services/carparkService.js";
import CarparkCard from "./CarParkCard";

const CarparkList = (props) => {
  const [carparkDetails, setCarparkDetails] = useState([]);

  return (
    <section>
      <h2>Available Carparks</h2>
      {props.carparks.length ? (
        <ul>
          {props.carparks.map((cp) => (
            <CarparkCard
              key={cp.car_park_no}
              carpark={cp}
              handleFavorites={props.handleFavorites}
            />
          ))}
        </ul>
      ) : (
        <p>No carpark available!</p>
      )}
    </section>
  );
};

export default CarparkList;
