import React, { useState } from "react";
import { useStarWars } from "../../context/StarWarsContext";
import ship_images from "../../json/ship.json";
import Spinner from "../../components/spinner";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, filteredArray, searchedText, starships } = useStarWars();
  const [displayCount, setDisplayCount] = useState(6);
  // displayedArray değişkenine searchedTextten gelen bir değer varsa varsa filteredArrayi yoksa starships arrayinden displayCount sayısı kadar eleman atanır
  let displayedArray = searchedText
    ? filteredArray
    : starships.slice(0, displayCount);
  //displayCount state değişkeninin değerini 6 arttırılır. Bu sayede displayedArray'deki gösterilecek eleman sayısı 6 artacak
  const loadMore = () => {
    setDisplayCount(displayCount + 6);
  };
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
            {filteredArray.length === 0 && searchedText && (
              <div className="text-center text-5xl font-bold mb-5">
                Starship not found
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayedArray.map((ship) => (
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
        <button
          onClick={loadMore}
          style={{
            display:
              searchedText || displayedArray.length >= starships.length
                ? "none"
                : "block",
          }}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded mt-5 text-base mb-5"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Home;
