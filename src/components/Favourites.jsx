import { useEffect, useState } from "react";
import * as CarparkService from "../services/carparkService";
import CarparkCard from "./CarParkCard";

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);

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
      setFavorites(favoriteCarparksLiveAvail);
    };
    fetchFavorites();
  }, []);

  const handleFavorites = (carpark) => {
    setFavorites(
      favorites.filter((fav) => fav.carpark_no !== carpark.carpark_no),
    );
    CarparkService.deleteFavorites(carpark.airtableId);
  };

  return (
    <>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((cp) => (
            <CarparkCard
              key={cp.airtableId}
              carpark={cp}
              isFavorite={true}
              handleFavorites={handleFavorites}
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
