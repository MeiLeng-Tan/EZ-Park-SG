import CarparkCard from "./CarparkCard";

const CarparkList = (props) => {
  return (
    <section className="px-4 py-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">
          Available Carparks
        </h2>
        <span className="text-xs font-bold px-2 py-1 bg-slate-200 text-slate-600 rounded-lg">
          {props.carparks.length} found
        </span>
      </div>

      {props.carparks.length ? (
        <div className="space-y-4">
          {props.carparks.map((cp) => (
            <CarparkCard
              key={cp.carpark_no}
              carpark={cp}
              handleFavorites={props.handleFavorites}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p>No carpark available!</p>
        </div>
      )}
    </section>
  );
};

export default CarparkList;
