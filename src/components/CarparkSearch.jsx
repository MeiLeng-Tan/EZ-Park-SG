import { useState } from "react";
import { useNavigate } from "react-router";

const initialFormData = {
  address: "",
  lot_type: "all",
  gantry_height: "0",
  free_parking: "all",
};

const CarparkSearch = (props) => {
  const [formData, setFormData] = useState(initialFormData);

  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.fetchData(formData);
    setFormData(initialFormData);
    navigate("/carparks");
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <section>
      <h2>Search Carpark</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">Search Location</label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
        />
        <label htmlFor="lot_type">Vehicle Type</label>
        <select
          id="lot_type"
          name="lot_type"
          value={formData.lot_type}
          onChange={handleChange}
        >
          <option value="all">All vehicle type</option>
          <option value="C">Cars</option>
          <option value="H">Heavy vehicles</option>
          <option value="S">Motorcycles with side car</option>
          <option value="Y">Motorcycles</option>
        </select>
        <label htmlFor="gantry_height">Gantry Height</label>
        <select
          id="gantry_height"
          name="gantry_height"
          value={formData.gantry_height}
          onChange={handleChange}
        >
          <option value="0">Any Height</option>
          <option value="1.9">At least 1.9m</option>
          <option value="2.1">At least 2.1m</option>
          <option value="4.5">At least 4.5m</option>
        </select>
        <label htmlFor="free_parking">Free Parking</label>
        <select
          id="free_parking"
          name="free_parking"
          value={formData.free_parking}
          onChange={handleChange}
        >
          <option value="all">Show all</option>
          <option value="free">Any Free Parking</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default CarparkSearch;
