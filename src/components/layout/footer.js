import React from "react";
import { useStarWars } from "../../context/StarWarsContext";

const Footer = () => {
  const {isDarkMode} = useStarWars();
  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} py-4`}>
      <div className="container mx-auto text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-2 md:mb-0">© 2023 Star Wars Starships </div>
        <div className="flex items-center space-x-2">
          <a href="https://github.com/Dogus-Erkan" className="hover:text-yellow-400">
            Github
          </a>
          <a href="https://www.linkedin.com/in/dogus-erkan/" className="hover:text-yellow-400">
            Linkedin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
