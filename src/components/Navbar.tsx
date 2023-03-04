import React, { FC, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthState, logout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

interface ModeType {
  handleType?: React.MouseEventHandler;
}

export const Navbar: FC<ModeType> = ({ handleType }) => {
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const auth = useSelector((state: {auth: AuthState}) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`, {
      state: {
        title: searchTerm,
      },
    });
  };

  const handleLogout = () => {
      dispatch(logout())
  }

  return (
    <>
      <nav className={`nav bg-teal-800 font-bold font-popins sticky top-0`}>
        <div className="flex flex-row gap-10">
          <Link to="/" className="site-title2">
            MOVIE ALTA
          </Link>
          <Link to="/" className="site-title">Home</Link>
          <Link to="/favorites" className="site-title">Favorite Movies</Link>

          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center mx-4"
          >
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-200 rounded-full px-4 py-2 w-full sm:w-64 mr-4 focus:outline-none focus:ring-2 focus:ring-slate-600"
            />
            <button
              type="submit"
              className="bg-slate-500 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 hover:bg-slate-700 transition-all duration-200"
            >
              Search
            </button>
          </form>
        </div>

        <ul className="text-xl flex justify-center my-auto gap-4">
        <label className="swap swap-rotate mr-10  my-auto">
          <input type="checkbox" onClick={handleThemeSwitch} />

          <svg
            className="swap-on fill-current w-10 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <svg
            className="swap-off fill-current w-10 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
            {
              auth.isAuth ?
              <div className="flex flex-row gap-2 justify-center">
                <h1>{auth.user?.username}</h1>
                <button onClick={() => handleLogout()} className="my-auto btn btn-xs bg-white">Logout</button>
              </div>
              :
              <Link to={"/login"}>
              <button className="btn bg-transparent text-bold text-white btn-sm border-zinc-300 btn-info">Login</button>

            </Link>
            }

            
        </ul>

        
      </nav>
    </>
  );
};

export default Navbar;
