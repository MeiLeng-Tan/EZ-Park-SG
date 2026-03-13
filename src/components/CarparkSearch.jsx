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
    <div className="px-4 py-8 bg-background min-h-[40vh] flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
        <div className="mb-6">
          <h2 className="text-2xl text-center font-black text-slate-800 tracking-tight">
            Find Parking <span className="text-primary text-3xl"></span>
          </h2>
          <p className="text-sm text-center text-slate-400 font-medium">
            Enter a location to see live availability
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="address" className="text-center">
              Search Location
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-slate-700 placeholder:text-slate-300 shadow-inner"
              placeholder="Search carpark or area..."
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="lot_type" className="text-center">
              Vehicle Type
            </label>
            <select
              id="lot_type"
              name="lot_type"
              className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-slate-700 placeholder:text-slate-300 shadow-inner"
              value={formData.lot_type}
              onChange={handleChange}
            >
              <option value="all">All vehicle type</option>
              <option value="C">Cars</option>
              <option value="H">Heavy vehicles</option>
              <option value="S">Motorcycles with side car</option>
              <option value="Y">Motorcycles</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="gantry_height" className="text-center">
              Gantry Height
            </label>
            <select
              id="gantry_height"
              name="gantry_height"
              className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-slate-700 placeholder:text-slate-300 shadow-inner"
              value={formData.gantry_height}
              onChange={handleChange}
            >
              <option value="0">Any Height</option>
              <option value="1.9">At least 1.9m</option>
              <option value="2.1">At least 2.1m</option>
              <option value="4.5">At least 4.5m</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="free_parking" className="text-center">
              Free Parking
            </label>
            <select
              id="free_parking"
              name="free_parking"
              className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-slate-700 placeholder:text-slate-300 shadow-inner"
              value={formData.free_parking}
              onChange={handleChange}
            >
              <option value="all">Show all</option>
              <option value="free">Any Free Parking</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarparkSearch;
