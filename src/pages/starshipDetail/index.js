import React, { useEffect, useState } from "react";
import Spinner from "../../components/spinner";
import { useStarWars } from "../../context/StarWarsContext";
import axios from "axios";
import ship_images from "../../json/ship.json";
import movies from "../../json/movies.json";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRebel, faEmpire } from "@fortawesome/free-brands-svg-icons";

const StarshipDetail = () => {
  const { name } = useParams();
  const { loading, setLoading, isDarkMode } = useStarWars();
  const [starshipDetail, setStarshipDetail] = useState([]);

  // localStoragedan favoriler dizisini alır eğer localStorage boşsa boş bir dizi olarak ayarlar
  const favoritesArray = JSON.parse(localStorage.getItem("favorites")) || [];

  // isStarshipAlreadyFavorited değişkeni favorilerin içinde olup olmadığını kontrol eder
  const isStarshipAlreadyFavorited =
    starshipDetail.length > 0 &&
    favoritesArray.some((favorite) => favorite.name === starshipDetail[0].name);

  // Buton rengi uzay gemisi favoriler arasında ise kırmızı değilse gri olarak ayarlanır
  const [buttonColor, setButtonColor] = useState(
    isStarshipAlreadyFavorited ? "red" : "gray"
  );

  const addToFavorites = () => {
    if (isStarshipAlreadyFavorited) {
      // Uzay gemisini favorilerden çıkar
      const newFavorites = favoritesArray.filter(
        (favorite) => favorite.name !== starshipDetail[0].name
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setButtonColor("white");
    } else {
      // Uzay gemisini favorilere ekle
      const newFavorite = { name: starshipDetail[0].name };
      const newFavorites = [...favoritesArray, newFavorite];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setButtonColor("red");
    }
  };

  //Uzay gemisi detayları veya favoriler dizisi değiştiğinde button rengini güncellemek için çağrılır
  useEffect(() => {
    setButtonColor(
      starshipDetail.length > 0 && isStarshipAlreadyFavorited ? "red" : "gray"
    );
  }, [starshipDetail, isStarshipAlreadyFavorited]);

  // useEffect kullanarak uzay gemisi detaylarını alır
  useEffect(() => {
    setLoading(true);
    const fetchBook = async () => {
      try {
        setLoading(true);
        await axios(`https://swapi.dev/api/starships/?search=${name}`).then(
          (res) => {
            setStarshipDetail(res.data.results); // Uzay Gemisi detaylarını alınan verilerle set eder
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [name, setLoading]); // name ve setLoading değiştiğinde useEffecti tekrar çağır

  return (
    // Uzay gemisi detaylarını ekrana yazdır
    <div className="text-gray-100 min-h-screen w-screen flex flex-col  items-center">
      <a
        className={`absolute mt-36 p-1 left-5 xl:md:bottom-[69%] xl:md:left-[5%] w-24 text-center md:xl:p-4 rounded ${
          isDarkMode
            ? "bg-gray-900 text-white hover:bg-gray-700"
            : "bg-white text-black hover:bg-slate-300"
        }`}
        href="/"
      >
        Back
      </a>
      <h1 className="text-center pt-48 mb-10 md:text-6xl text-4xl font-star-wars border-b-4 border-yellow-400	">
        {starshipDetail.length > 0
          ? starshipDetail[0].name
          : "Starship Not Found"}
      </h1>
      {!loading ? (
        starshipDetail && starshipDetail.length > 0 ? (
          <div className="container mx-auto mt-10">
            <div
              className={` rounded-md shadow-lg grid grid-cols-1 md:grid-cols-2 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
            >
              <img
                alt={starshipDetail[0].name}
                src={ship_images[starshipDetail[0].name]}
                className="h-full w-full"
              />
              <div className="p-8">
                <table className="table-auto w-full h-full flex items-center">
                  <tbody>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Model:
                        </span>
                      </td>
                      <td>{starshipDetail[0].model}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Manufacturer:
                        </span>
                      </td>
                      <td>{starshipDetail[0].manufacturer}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Starship Class:
                        </span>
                      </td>
                      <td>{starshipDetail[0].starship_class}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Max Atmosphering Speed:
                        </span>
                      </td>
                      <td>{starshipDetail[0].max_atmosphering_speed}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Length:
                        </span>
                      </td>
                      <td>{starshipDetail[0].length}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Hyperdrive Rating::
                        </span>
                      </td>
                      <td>{starshipDetail[0].hyperdrive_rating}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          MGLT:
                        </span>
                      </td>
                      <td>{starshipDetail[0].MGLT}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Crew:
                        </span>
                      </td>
                      <td>{starshipDetail[0].crew}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Cargo Capacity:
                        </span>
                      </td>
                      <td>{starshipDetail[0].cargo_capacity}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Cost in Credits:
                        </span>
                      </td>
                      <td>{starshipDetail[0].cost_in_credits}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Passengers:
                        </span>
                      </td>
                      <td>{starshipDetail[0].passengers}</td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-4">
                        <span className="border-b-2 border-yellow-400">
                          Add To Favorites:
                        </span>
                      </td>
                      <td className="pt-4">
                        <button onClick={addToFavorites}>
                          <FontAwesomeIcon
                            style={{
                              color: buttonColor,
                              fontSize: "30px",
                            }}
                            icon={isDarkMode ? faEmpire : faRebel}
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <h1 className="text-center pt-10 mb-10 md:text-6xl text-4xl font-star-wars border-b-4 border-yellow-400	">
              Movies
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-5 mb-10 gap-4 md:gap-0">
              {starshipDetail[0].films.map((ship, key) => (
                <div key={key} className="h-[30rem] ">
                  <img
                    alt={movies[ship]}
                    src={movies[ship]}
                    className="h-full w-full object-contain hover:opacity-75 "
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-white min-h-screen w-screen text-5xl flex flex-col mt-10 items-center">
            <p>Searched starship not found</p>
            <a
              href="/"
              className="flex items-center space-x-2 mt-5 bg-yellow-400 hover:bg-yellow-300 text-gray-100 px-4 py-2 rounded transition duration-150"
              title="Return Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Return Back</span>
            </a>
          </div>
        )
      ) : (
        <div className="container mx-auto p-5 md:p-0">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default StarshipDetail;
