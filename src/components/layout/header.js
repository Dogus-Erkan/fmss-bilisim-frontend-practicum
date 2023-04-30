import React, { useState } from "react";

import SearchBar from "../searchBar";
import { useStarWars } from "../../context/StarWarsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRebel, faEmpire } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, setIsDarkMode } = useStarWars();
  return (
    <nav
      className={`flex items-center justify-between flex-wrap p-6 fixed w-full z-50 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center text-white mr-6 lg:mr-72">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png"
            className="h-20 mr-3"
            alt="Star Wars Logo"
          />
        </a>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>

      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="lg:flex-grow">
          <SearchBar />
        </div>

        <div className="flex justify-end">
          <ul className="font-medium flex p-4 md:p-0 mt-4  flex-row md:space-x-8 md:mt-0 md:border-0 ">
            <li className="text-lg flex items-center">
              <Link to={`favourites`} className="hover:text-yellow-400">Favourite Starships</Link>
            </li>
            <li>
              <button
                className="w-10 h-10"
                onClick={() => {
                  setIsDarkMode(true);
                  localStorage.setItem("darkMode", true);
                }}
              >
                <FontAwesomeIcon
                  style={{
                    color: isDarkMode ? "red" : "black",
                    fontSize: "40px",
                  }}
                  icon={faEmpire}
                />
              </button>
            </li>
            <li>
              <button
                className="w-10 h-10"
                onClick={() => {
                  setIsDarkMode(false);
                  localStorage.setItem("darkMode", false);
                }}
              >
                <FontAwesomeIcon
                  style={{
                    color: isDarkMode ? "white" : "blue",
                    fontSize: "40px",
                  }}
                  icon={faRebel}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
