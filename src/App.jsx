import { useEffect, useState } from "react";
import "./App.css";
import * as CarparkService from "./services/carparkService";
import CarparkSearch from "./components/CarparkSearch";
import CarparkList from "./components/CarparkList";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Favorites from "./components/Favourites";

const App = () => {
  const [displayedCarparks, setDisplayedCarparks] = useState({});
  const [favoriteCarparks, setFavoriteCarparks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch favorite carparks data from Airtable
    const fetchAirtableData = async () => {
      try {
        const data = await CarparkService.getFavorites();
        setFavoriteCarparks(data);
      } catch (error) {
        console.error("Failed to fetch favorite carparks data: ", error);
      }
    };
    fetchAirtableData();
  }, []);

  const handleCarparkSearch = async (searchData) => {
    setIsLoading(true);
    //Fetch carpark data
    const fetchCarparkData = async () => {
      const carparkData = await CarparkService.getCarparkData(searchData);
      const liveAvailability = await CarparkService.getCarparkAvailability();

      if (carparkData && liveAvailability) {
        const filterCarparks = carparkData.filter((cp) => {
          const filterFreeParking =
            searchData.free_parking === "all" || cp.free_parking !== "NO";
          const filterGantryHeight =
            parseFloat(cp.gantry_height) >=
            parseFloat(searchData.gantry_height);
          return filterFreeParking && filterGantryHeight;
        });

        //Filter availability and lot type
        const availCarparks = filterCarparks.reduce((acc, cp) => {
          const liveMatch = liveAvailability.find(
            (live) => live.carpark_number === cp.car_park_no,
          );

          let filterLotAvail = [];
          if (searchData.lot_type === "all") {
            filterLotAvail = liveMatch?.carpark_info || [];
          } else {
            const filterLotType = liveMatch?.carpark_info.find(
              (lot) => lot.lot_type === searchData.lot_type,
            );
            if (filterLotType) {
              filterLotAvail = [filterLotType];
            }
          }
          if (filterLotAvail.length === 0) {
            return acc;
          }
          acc.push({
            address: cp.address,
            carpark_no: cp.car_park_no,
            gantry_height: cp.gantry_height,
            free_parking: cp.free_parking,
            availability_info: filterLotAvail,
          });
          return acc;
        }, []);
        setDisplayedCarparks(availCarparks);
        setIsLoading(false);
      }
    };
    fetchCarparkData();
  };

  const handleFavorites = async (carpark) => {
    const existingFavorite = favoriteCarparks.find(
      (fav) => fav.carpark_no === carpark.carpark_no,
    );
    if (existingFavorite) {
      setFavoriteCarparks((prev) =>
        prev.filter((fav) => fav.carpark_no !== carpark.carpark_no),
      );
      if (existingFavorite.airtableId) {
        await CarparkService.deleteFavorites(existingFavorite.airtableId);
      } else {
        console.log("No airtable Id found");
      }
    } else {
      const response = await CarparkService.addFavorites(carpark);
      const Cp = {
        ...carpark,
        airtableId: response.id,
      };
      setFavoriteCarparks((prev) => [...prev, Cp]);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-md mx-auto pb-20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
                Fetching carpark availability data...
              </p>
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={<CarparkSearch fetchData={handleCarparkSearch} />}
              />
              <Route
                path="/carparks"
                element={
                  <CarparkList
                    carparks={displayedCarparks}
                    handleFavorites={handleFavorites}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <Favorites
                    favoriteCarparks={favoriteCarparks}
                    setFavoriteCarparks={setFavoriteCarparks}
                    handleFavorites={handleFavorites}
                  />
                }
              />
            </Routes>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
