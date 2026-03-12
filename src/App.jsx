import { useEffect, useState } from "react";
import "./App.css";
import * as CarparkService from "./services/carparkService";
import CarparkSearch from "./components/CarparkSearch";
import CarparkList from "./components/CarparkList";
import Navbar from "./components/NavBar";
import { Route, Routes } from "react-router";
import Favorites from "./components/Favourites";

// src/App.jsx
const App = () => {
  const [displayedCarparks, setDisplayedCarparks] = useState({});
  const [favorites, setFavorites] = useState([]);

  const handleCarparkSearch = async (searchData) => {
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
      }
    };
    fetchCarparkData();
  };

  const handleFavorites = (carpark) => {
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.car_park_no === carpark.carpark_no,
    );
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, carpark]);
      CarparkService.addFavorites(carpark);
    }
  };

  return (
    <>
      <h1>EZ_Park SG</h1>
      <Navbar />
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
            <Favorites favorites={favorites} setFavorites={setFavorites} />
          }
        />
      </Routes>
    </>
  );
};

export default App;
