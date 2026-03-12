const CarparkCard = (props) => {
  const lotTypeString = {
    C: "Cars",
    H: "Heavy vehicles",
    S: "Motorcycles with side car",
    Y: "Motorcycles",
  };

  return (
    <>
      <h2>Carpark Details</h2>
      <p>Address: {props.carpark.address}</p>
      <p>Carpark No: {props.carpark.carpark_no}</p>
      <p>Gantry Height: {props.carpark.gantry_height}</p>
      <p>Free Parking: {props.carpark.free_parking}</p>
      {props.carpark.availability_info &&
      props.carpark.availability_info.length > 0 ? (
        props.carpark.availability_info.map((info, idx) => (
          <div key={idx}>
            <p>Lot Type: {lotTypeString[info.lot_type]}</p>
            <p>Lot Available: {info.lots_available}</p>
            <p>Total Lot: {info.total_lots}</p>
          </div>
        ))
      ) : (
        <p>No real-time info available!</p>
      )}
      <button onClick={() => props.handleFavorites(props.carpark)}>
        {props.isFavorite ? "Delete" : "⭐"}
      </button>
    </>
  );
};

export default CarparkCard;
