import { useEffect, useState } from "react";
import * as CarparkService from "../services/carparkService";
import CarparkCard from "./CarparkCard";

const Favorites = (props) => {
  //const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteCarparks = await CarparkService.getFavorites();
      const liveAvailability = await CarparkService.getCarparkAvailability();
      const favoriteCarparksLiveAvail = favoriteCarparks.map((fav) => {
        const liveAvail = liveAvailability.find(
          (cp) => cp.carpark_number === fav.carpark_no,
        );
        return {
          ...fav,
          availability_info: liveAvail ? liveAvail.carpark_info : [],
        };
      });
      // props.setFavoriteCarparks(favoriteCarparks);
    };
    fetchFavorites();
  }, []);

  //   const handleFavorites = (carpark) => {
  //     setFavorites(
  //       favorites.filter((fav) => fav.carpark_no !== carpark.carpark_no),
  //     );
  //     CarparkService.deleteFavorites(carpark.airtableId);
  //   };

  return (
    <>
      {props.favoriteCarparks.length > 0 ? (
        <ul>
          {props.favoriteCarparks.map((cp) => (
            <CarparkCard
              key={cp.airtableId}
              carpark={cp}
              isFavorite={true}
              handleFavorites={props.handleFavorites}
            />
          ))}
        </ul>
      ) : (
        <p>No favorite carparks available!</p>
      )}
    </>
  );
};

export default Favorites;
