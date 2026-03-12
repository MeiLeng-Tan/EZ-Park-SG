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

  //Read initial state from Airtable
  useEffect(() => {
    const fetchAirtableData = async () => {
      try {
        const data = await CarparkService.getFavorites();
        console.log("fetch fav data", data);
        setFavoriteCarparks(data);
      } catch (error) {
        console.error("Failed to fetch favorite carparks data: ", error);
      }
    };
    fetchAirtableData();
  }, []);

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

  const handleFavorites = async (carpark) => {
    const existingFavorite = favoriteCarparks.find(
      (fav) => fav.carpark_no === carpark.carpark_no,
    );
    console.log("already fav", existingFavorite);
    if (existingFavorite) {
      console.log("fav cp", carpark);
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
      console.log("response", response);
      const Cp = {
        ...carpark,
        airtableId: response.id,
      };
      setFavoriteCarparks((prev) => [...prev, Cp]);
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
            <Favorites
              favoriteCarparks={favoriteCarparks}
              setFavoriteCarparks={setFavoriteCarparks}
              handleFavorites={handleFavorites}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
