import React from "react";
import { NavLink } from "react-router-dom";

function AnimeCard({ anime }) {
  return (
    <article className="anime-card">
      {/* React Router <NavLink> component that represents a link to a specific route. */}
      {/* It is set using the ${anime.mal_id}-link combination to provide a unique key to the <NavLink> component. */}
      <NavLink
        key={`${anime.mal_id}-link`}
        to={`/anime/${anime.mal_id}` && `/anime/${anime.mal_id}`}
      >
        {/* The src property is set to anime.images.jpg.large_image_url, which is the URL of the large image from the anime. */}
        <figure>
          {/* The alt property is set to "Anime" to provide alternative text in case the image does not load correctly. */}
          <img src={anime.images.jpg.large_image_url} alt="Anime" />
        </figure>
        {/* The anime.title property is used to set the content of the element. */}
        <h3>{anime.title}</h3>
      </NavLink>
    </article>
  );
}

export default AnimeCard;
