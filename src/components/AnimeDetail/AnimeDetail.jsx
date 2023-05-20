import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Tooltip } from "@mui/material";
import "./AnimeDetail.css";

function AnimeDetail() {
  // Allows access to the category value within the component.
  const { category } = useParams();
  // It is used to update the anime value in the future.
  const [anime, setAnime] = useState([]);
  // The setCharacters function is used to update the value of characters in the future.
  const [characters, setCharacters] = useState([]);

  // Is used to define the URL of an image in the component.
  const imgUrl = require(`../../assets/images/MAL.png`);

  const fetchAnime = async (category) => {
    /* uses the .then() method to extract the response data in JSON format and assign it to the temp variable. 
    Using await ensures that the request completes before continuing execution.*/
    const temp = await fetch(`https://api.jikan.moe/v4/anime/${category}`).then(
      (res) => res.json()
    );
    // Updates the anime status with the data obtained from the API.
    setAnime(temp.data);
  };

  const fetchCharacters = async (anime) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    ).then((res) => res.json());
    // Sorts the data obtained from the API based on the favorites property of each object in descending order
    let sortedData = temp?.data.sort((a, b) =>
      a.favorites < b.favorites ? 1 : -1
    );
    /* This line uses the setCharacters function to update the characters state with the data obtained from the API,
     limiting the results to the first 10 elements of the sortedData array.*/
    setCharacters(sortedData?.slice(0, 10));
  };

  useEffect(() => {
    /* checks if the category variable has a value. If category has a value (that is, if it exists), 
    the following statements within the code block are executed. */
    if (category) {
      /* Passes the category value as the argument, and this makes an API request to get the anime data corresponding to the specified category. */
      fetchAnime(category);
      fetchCharacters(category);
    }
    // Will be executed every time the category variable changes. If category doesn't change, the effect won't play again.
  }, [category]);

  return (
    <div>
      <h1 className="title">
        {/* Esto permite navegar hacia la página principal al hacer clic en el elemento. */}
        <NavLink to="/">
          <Tooltip title="Back">
            <ArrowBackIosIcon className="back-button" fontSize="large" />
          </Tooltip>
        </NavLink>
        {/* It shows the title in English if it is available otherwise it will show it in Japanese */}
        {anime?.title_english || anime?.title_japanese}
        {/* The link should open in a new browser tab or window. The rel="noreferrer" 
        attribute improves security and privacy when opening the link. */}
        <a href={anime?.url} target="_blank" rel="noreferrer">
          {/* An image represented by the imgUrl URL is displayed. */}
          <img
            src={imgUrl}
            height="28px"
            width="28px"
            alt=""
            title="View at MyAnimeList.net"
          />
        </a>
      </h1>
      <div className="background-text">
        {/* The "synopsis" field of the anime is displayed. */}
        <div>{anime?.synopsis}</div>
        {/* The "background" field of the anime is displayed. */}
        <div>{anime?.background}</div>
      </div>
      <div className="list-group">
        <div className="image-container">
          <img src={anime?.images?.jpg?.image_url} alt=""></img>
        </div>
        <div className="text-container">
          {/* <span>{anime?.rank}</span> shows the rank of the anime, <span>{anime?.popularity}</span> shows the popularity, and so on. Using the anime?.
          property ensures that the value is returned only if anime exists and has the corresponding property. */}
          {/* No voy a comentar una a una ;) */}
          <div>
            <span className="dark-text">Rank: </span>
            <span>{anime?.rank}</span>
          </div>
          <div>
            <span className="dark-text">Popularity: </span>
            <span>{anime?.popularity}</span>
          </div>
          <div>
            <span className="dark-text">Score: </span>
            <span>{anime?.score}</span>
          </div>
          <div>
            <span className="dark-text">Members: </span>
            <span>{anime?.members}</span>
          </div>
          <div>
            <span className="dark-text">Source: </span>
            <span>{anime?.source}</span>
          </div>
          <div>
            <span className="dark-text">Source: </span>
            <span>{anime?.duration}</span>
          </div>
          <div>
            <span className="dark-text">Status: </span>
            <span>{anime?.status}</span>
          </div>
          <div>
            <span className="dark-text">Status: </span>
            <span>{anime?.status}</span>
          </div>
          <div>
            <span className="dark-text">Rating: </span>
            <span>{anime?.rating}</span>
          </div>
        </div>
      </div>
      {/* Checks if the length of the characters array is greater than 0. If this condition is met, 
      the content inside this block is displayed. */}
      {characters?.length > 0 && (
        <div className="character-section">
          <h1 className="title">Characters</h1>
          <div className="character">
            {/* It iterates over each element of the characters array and executes the mapping function. */}
            {characters?.map((item) => {
              return (
                <div className="character-item">
                  {/* The name of the character contained in the name property of the item.character object is displayed. */}
                  <span>{item.character.name}</span>
                  <div>
                    <img
                      width="150"
                      height="200"
                      src={item.character.images.jpg.image_url}
                      alt=""
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* checks if the trailer property of the anime object exists and if the embed_url property of the trailer object exists. */}
      {/* displays an iframe element that allows viewing a video. The video URL is obtained from anime?.trailer?.embed_url. */}
      {anime?.trailer?.embed_url ? (
        <div className="trailer-section">
          <h1 className="title">Trailer</h1>
          <div align="center">
            <iframe
              id="inlineFrameExample"
              title="Inline Frame Example"
              width="1000"
              height="500"
              src={anime?.trailer?.embed_url}
            ></iframe>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AnimeDetail;
