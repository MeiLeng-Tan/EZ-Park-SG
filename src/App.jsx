import { useEffect, useState } from "react";
import "./App.css";
import * as CarparkService from "./services/carparkService";
import CarparkSearch from "./components/CarparkSearch";
import CarparkList from "./components/CarparkList";
import Navbar from "./components/NavBar";
import { Route, Routes } from "react-router";

// src/App.jsx
const App = () => {
  const [allCarparkData, setAllCarparkData] = useState([]);
  const [displayedCarparks, setDisplayedCarparks] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    //Fetching carpark data
    const fetchData = async () => {
      const data = await CarparkService.getCarparkData();
      if (data) {
        setAllCarparkData(data);
      }
    };
    fetchData();
  }, []);

  const handleCarparkSearch = async (searchData) => {
    // Fetch carpark availability data
    const liveAvailability = await CarparkService.getCarparkAvailability();
    //console.log("search", searchData);
    //Search carpark based on location
    console.log("searchData", searchData);
    console.log("all cp", allCarparkData.length);
    const filteredCarpark = allCarparkData.filter((cp) => {
      const filterAddress = cp.address
        .toLowerCase()
        .includes(searchData.address.toLowerCase());
      const gantryHeight =
        filterAddress &&
        parseFloat(cp.gantry_height) >= parseFloat(searchData.gantry_height);
      const filterFreeParking =
        (gantryHeight && searchData.free_parking === "all") ||
        (searchData.free_parking === "free" && cp.free_parking !== "NO");
      return filterAddress && gantryHeight && filterFreeParking;
    });
    console.log("filter carpark", filteredCarpark);

    const filteredCarparkAvailability = filteredCarpark.map((cp) => {
      const cpAvail = liveAvailability.find(
        (c) => c.carpark_number === cp.car_park_no,
      );
      let cpInfo = [];

      if (searchData.lot_type !== "all") {
        cpInfo = cpAvail
          ? cpAvail.carpark_info.find((t) => t.lot_type === searchData.lot_type)
          : [];
      } else {
        cpInfo = cpAvail.carpark_info;
      }

      return {
        address: cp.address,
        car_park_no: cp.car_park_no,
        gantry_height: cp.gantry_height,
        free_parking: cp.free_parking,
        availability_info: cpInfo,
      };
    });

    console.log("cp avail", filteredCarparkAvailability);
    if (filteredCarparkAvailability) {
      setDisplayedCarparks(filteredCarparkAvailability);
    }
  };

  const handleFavorites = (carpark) => {
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.car_park_no === carpark.car_park_no,
    );
    if (isAlreadyFavorite) {
      //Toggle if already favorites
      setFavorites(
        favorites.filter((fav) => fav.car_park_no !== carpark.car_park_no),
      );
    } else {
      setFavorites([...favorites, carpark]);
    }
  };

  return (
    <>
      <h1>EZ_Park SG</h1>
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route
          path="/carparks"
          element={
            <CarparkList
              carparks={displayedCarparks}
              handleFavorites={handleFavorites}
            />
          }
        />
      </Routes> */}
      {/* <p>{allCarparkData.length}</p> */}
      {/* <button onClick={fetchCarparkAvailability}>Search Carpark</button>; */}
      <CarparkSearch fetchData={handleCarparkSearch} />
      <CarparkList
        carparks={displayedCarparks}
        handleFavorites={handleFavorites}
      />
    </>
  );
};

export default App;
