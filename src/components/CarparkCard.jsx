const CarparkCard = (props) => {
  const addFavourites = () => {};

  return (
    <>
      <h2>Carpark Details</h2>
      <p>Address: {props.carpark.address}</p>
      <p>Carpark No: {props.carpark.car_park_no}</p>
      <p>Gantry Height: {props.carpark.gantry_height}</p>
      <p>Free Parking: {props.carpark.free_parking}</p>
      <p>Lot Available: {props.carpark.availability_info.lots_available }</p>
      {/* {props.carpark.availability_info.length > 0 ? (
        props.carpark.availability_info.map((info, idx) => (
          <div key={idx}>
            <p>Lot Type: {info.lot_type}</p>
            <p>Lot Available: {info.lots_available}</p>
          </div>
        ))
      ) : (
        <p>No real-time info available!</p>
      )} */}
      <button onClick={() => props.handleFavorites(props.carpark)}>⭐</button>
    </>
  );
};

export default CarparkCard;
