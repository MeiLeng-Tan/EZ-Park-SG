import { useState } from "react";
import CarparkCard from "./CarparkCard";

const CarparkList = (props) => {
  const [carparkDetails, setCarparkDetails] = useState([]);

  return (
    <section>
      <h2>Available Carparks</h2>
      {props.carparks.length ? (
        <ul>
          {props.carparks.map((cp) => (
            <CarparkCard
              key={cp.carpark_no}
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
