import { Link, NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">EZ</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Park<span className="text-primary">SG</span>
          </h1>
        </Link>
        <div className="flex gap-4 text-sm font-bold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-slate-400"
            }
          >
            Search
          </NavLink>
          <NavLink
            to="/carparks"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-slate-400"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-slate-400"
            }
          >
            Favorites
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
