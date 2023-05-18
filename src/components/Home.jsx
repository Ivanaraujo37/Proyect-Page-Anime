import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar/Sidebar";

function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [search, setSearch] = useState("");

  const getTopAnime = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=airing`
    ).then((res) => res.json());

    setTopAnime(temp.data?.slice(0, 5));

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
    e.preventDefault();
    fetchAnime(search);
  };

  const handleFilter = (value) => {
    getFilteredAnime(value);
  };

  const fetchAnime = async (query) => {
    const temp = await axios
      .get(`https://api.jikan.moe/v4/anime?q=${query}&order_by=popularity&sort=asc&sfw`)
      .then((res) => res.data);
  
    setAnimeList(temp.data);
  };
  

  useEffect(() => {
    getTopAnime();
    getPopularAnime();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} popularAnime={popularAnime} />
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
