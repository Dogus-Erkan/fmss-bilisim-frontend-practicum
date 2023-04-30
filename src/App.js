import "./App.css";
import { StarWarsProvider } from "./context/StarWarsContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/home";
import Header from "./components/layout/header";
import Page404 from "./pages/404";
import StarshipDetail from "./pages/starshipDetail";
import Footer from "./components/layout/footer";
import Favourites from "./pages/favourites";

function App() {
  return (
    <StarWarsProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/starshipDetail/:name" element={<StarshipDetail />} />
          <Route exact path="/favourites" element={<Favourites />} />
          <Route path="*" element={<Page404/>} />
        </Routes>
        <Footer/>
      </Router>
    </StarWarsProvider>
  );
}

export default App;
