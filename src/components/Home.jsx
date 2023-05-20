import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar/Sidebar";

function Home() {
  // We use the UseState to store and update different data
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [search, setSearch] = useState("");

  const getTopAnime = async () => {
    // With the "fetch" and "await" function we wait for the request to complete
    const temp = await fetch(
      // We make a request to the Jikan API
      `https://api.jikan.moe/v4/top/anime?filter=airing`
      // with the json() we convert the response to JSON
    ).then((res) => res.json());
    // Then we store the response in the temp variable
    // Use the setTopAnime function to set the topAnime state to the first 5 animes in the returned list.
    setTopAnime(temp.data?.slice(0, 5));
    // Use the setAnimeList function to set the animeList state to the full list of animes returned.
    setAnimeList(temp.data);
  };

  const getPopularAnime = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=bypopularity`
    ).then((res) => res.json());

    setPopularAnime(temp.data?.slice(0, 5));
  };

  const getFilteredAnime = async (value) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=${value}`
    ).then((res) => res.json());

    setAnimeList(temp.data);
  };

  const handleSearch = (e) => {
    // This prevents the default action associated with the event from being performed.
    e.preventDefault();
    // This function takes care of searching for animes using the provided search term.
    fetchAnime(search);
  };

  const handleFilter = (value) => {
    // This function is responsible for obtaining and filtering the animes according to the value provided.
    getFilteredAnime(value);
  };

  const fetchAnime = async (query) => {
    const temp = await axios
    // The URL includes the query parameter to perform the search on the Jikan API. The response data is assigned to the variable temp`.
      .get(`https://api.jikan.moe/v4/anime?q=${query}&order_by=popularity&sort=asc&sfw`)
      // Updates the animeList state with the data of the animes obtained.
      .then((res) => res.data);
  
    setAnimeList(temp.data);
  };
  

  useEffect(() => {
    // Calls the getTopAnime function, which makes an API request to get the most popular anime currently streaming.
    getTopAnime();
    // Calls the getPopularAnime function, which makes an API request to get the most popular anime overall.
    getPopularAnime();
  }, []);

  return (
    // This code represents the main structure of the Home component, including the header, sidebar, and main content of the page.
    <div className="App">
      <Header />
      <div className="content-wrap">
      {/*Renders the Sidebar component and passes the topAnime and popularAnime properties to this component. 
      These properties are used to display the most popular anime list and popular anime in the Sidebar component. */}
        <Sidebar topAnime={topAnime} popularAnime={popularAnime} />
        {/* Renders the MainContent component and passes various properties to this component, such as the handleSearch and handleFilter functions, the search state, 
        the setSearch function, and the animeList anime list. These properties are used in the MainContent component to do things like search 
        for anime and filter the list of anime. */}
        <MainContent
          handleSearch={handleSearch}
          handleFilter={handleFilter}
          search={search}
          setSearch={setSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
}

export default Home;
