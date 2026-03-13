import { useEffect, useState } from "react";
import * as CarparkService from "../services/carparkService";
import CarparkCard from "./CarparkCard";

const Favorites = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteCarparksWithAvail, setFavoriteCarparksWithAvail] = useState(
    [],
  );

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
          availability_info: liveAvail?.carpark_info || [],
        };
      });
      setFavoriteCarparksWithAvail(favoriteCarparksLiveAvail);
      setIsLoading(false);
    };
    fetchFavorites();
  }, []);

  const handleDelete = async (carpark) => {
    // Updates the state in App.jsx
    await props.handleFavorites(carpark);

    // Updates the local view
    setFavoriteCarparksWithAvail((prevList) =>
      prevList.filter((item) => item.carpark_no !== carpark.carpark_no),
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
          Fetching data from Airtable...
        </p>
      </div>
    );
  }
  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-black text-slate-800 mb-6">My Favorites</h2>
      {favoriteCarparksWithAvail.length > 0 ? (
        <ul>
          {favoriteCarparksWithAvail.map((cp) => (
            <CarparkCard
              key={cp.airtableId}
              carpark={cp}
              isFavorite={true}
              handleFavorites={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <p>No favorite carparks available!</p>
      )}
    </section>
  );
};

export default Favorites;
