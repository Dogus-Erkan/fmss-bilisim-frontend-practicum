import React from "react";
import { useStarWars } from "../../context/StarWarsContext";
import ship_images from "../../json/ship.json";
import Spinner from "../../components/spinner";
import { Link } from "react-router-dom";

const Favourites = () => {
  const { loading } = useStarWars();
  // localStoragedan favoriler dizisini alır eğer localStorage boşsa boş bir dizi olarak ayarlar
  const favoritesArray = JSON.parse(localStorage.getItem("favorites")) || [];
  return (
    <div className="min-h-screen text-white">
      <h1 className="text-center pt-36 mb-10 md:text-6xl text-4xl font-star-wars border-b-4 border-yellow-400	">
        Star Wars Starships
      </h1>
      <div className="container mx-auto p-5 md:p-0">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {favoritesArray.length === 0 && (
              <div className="text-center text-5xl font-bold mb-5">
               There is no favourite starship found
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {favoritesArray.map((ship) => (
                <div key={ship.name} className="  ">
                  <Link
                    to={`/starShipDetail/${ship.name}`}
                    className="group relative block bg-black"
                  >
                    <img
                      alt={ship.name}
                      src={ship_images[ship.name]}
                      className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    />

                    <div className="relative p-4 sm:p-6 lg:p-8">
                      <h1 className="text-2xl font-bold text-white md:text-4xl font-star-wars tracking-wider">
                        {ship.name}
                      </h1>

                      <div className="mt-32 sm:mt-48 lg:mt-64">
                        <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                          <p className="text-xl text-white mb-4">
                            Starship Class: {ship.starship_class}
                          </p>
                          <p className="text-xl text-white mb-4">
                            Hyperdrive rating: {ship.hyperdrive_rating}
                          </p>
                          <span className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded mt-5 text-base">
                            See Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favourites;
