const CarparkCard = (props) => {
  const {
    address,
    carpark_no,
    gantry_height,
    free_parking,
    availability_info,
  } = props.carpark;

  const lotTypeString = {
    C: "Cars",
    H: "Heavy vehicles",
    S: "Motorcycles with side car",
    Y: "Motorcycles",
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm active:scale-[0.98] transition-transform">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {/* Carpark No as a small badge */}
          <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase tracking-wider">
            {carpark_no}
          </span>
          <h3 className="text-lg font-bold text-slate-800 leading-tight mt-1">
            {address}
          </h3>
        </div>
        {/* Favorite Button */}
        <button
          onClick={() => props.handleFavorites(props.carpark)}
          className={`p-3 rounded-2xl transition-colors ${
            props.isFavorite
              ? "bg-red-50 text-red-500"
              : "bg-slate-50 text-slate-400"
          }`}
        >
          {props.isFavorite ? "✕" : "⭐"}
        </button>
      </div>
      {/* Gantry & Free Parking Info */}
      <div className="flex gap-3 mb-4">
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
          <span className="text-primary">H:</span> {gantry_height}m
        </div>
        {free_parking !== "NO" && (
          <div className="flex items-center gap-1 text-[11px] font-bold text-success bg-green-50 px-2 py-1 rounded-lg">
            FREE: {free_parking}
          </div>
        )}
      </div>
      {/* Availability Section */}
      <div className="space-y-2">
        {availability_info && availability_info.length > 0 ? (
          availability_info.map((info, idx) => {
            const isLow = info.lots_available < 5;
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {lotTypeString[info.lot_type] || "General"}
                  </p>
                  <p className="text-xs font-bold text-slate-600">
                    Total: {info.total_lots}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-2xl font-black ${isLow ? "text-danger" : "text-success"}`}
                  >
                    {info.lots_available}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Available
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-xs font-bold text-amber-500 bg-amber-50 p-2 rounded-xl text-center">
            No real-time info available!
          </p>
        )}
      </div>
    </div>
  );
};

export default CarparkCard;
