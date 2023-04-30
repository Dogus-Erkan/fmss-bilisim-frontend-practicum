
import { useNavigate } from "react-router-dom";
import { useStarWars } from "../../context/StarWarsContext";

const SearchBar = () => {
  const { searchedText, setSearchedText } = useStarWars();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedText(searchedText);
    navigate("/");
  };

  // Input değiştiğinde çalışacak fonksiyon
  const handleChange = (e) => {
    setSearchedText(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchedText}
          onChange={handleChange}
          style={{
            padding: "10px",
            border: "2px solid #ccc",
            borderRadius: "5px",
            outline: "none",
            boxShadow: "none",
            fontSize: "16px",
            transition: "all 0.3s ease",
            width: "85%",
            maxWidth: "100%",
            color: "#000"
          }}
        />
      </form>
    </>
  );
};

export default SearchBar;
