import axios from "axios";
import { useContext, useEffect, useState } from "react";

const { createContext } = require("react");

const StarWarsContext = new createContext();

export const StarWarsProvider = ({ children }) => {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedText, setSearchedText] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  const darkModeStorage = localStorage.getItem("darkMode");
  const [favorites, setFavorites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    darkModeStorage === "true" || darkModeStorage === null ? true : false
  );

// useEffect hookunu kullanarak starships verilerini API'dan çekiyoruz.
  useEffect(() => {
    const getPeople = async () => {
      try {
        setLoading(true);
        let allStarships = [];
        let page = 1;
        let response;
        do {
          response = await axios.get(
            `https://swapi.dev/api/starships/?page=${page}`
          );
          allStarships = [...allStarships, ...response.data.results];
          page++;
        } while (response.data.next);
        setStarships(allStarships);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getPeople();
  }, []);


  // Context içinde kullanacağımız değişkenlerimizi values objesi içinde tanımlıyoruz.
  const values = {
    starships,
    setStarships,
    loading,
    setLoading,
    searchedText,
    setSearchedText,
    filteredArray,
    isDarkMode,
    setIsDarkMode,
    favorites,
    setFavorites
  };


// useEffect hookunu kullanarak starships verileri filtreleniyor.
  useEffect(() => {
    const fetchStarships = async () => {
      try {
        setLoading(true);
        if (searchedText) {
          const res = await axios.get(
            `https://swapi.dev/api/starships/?search=${searchedText}`
          );
          setFilteredArray(res.data.results);
        } else {
          setFilteredArray(starships);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (starships.length > 0) {
      // starships arrayi tamamen doldurulduktan sonra çalışacak.
      fetchStarships();
    }
  }, [searchedText, starships]);

  return (
    <StarWarsContext.Provider value={values}>
      {children}
    </StarWarsContext.Provider>
  );
};

export const useStarWars = () => useContext(StarWarsContext);
