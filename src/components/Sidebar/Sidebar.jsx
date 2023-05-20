import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ topAnime, popularAnime }) {
  // This allows the image to be used in the component.
  const imgUrl = require(`../../assets/images/MAL.png`);

  return (
    <div>
      <aside>
        <nav>
          <h3>Top Anime</h3>
          <div>
            {/* Checks if topAnime is defined and not null before mapping it. 
            This prevents errors in case topAnime is empty or not initialized. */}
            {/* .map iterates over each element of the topAnime array and returns a new array of rendered elements. */}
            {topAnime &&
            
              topAnime.map((anime, index) => (
                <div className="sidebar-card" key={anime.mal_id}>
                  <span className="sidebar-rank">
                    {index + 1}
                    {/* Redirects to anime url link on MyAnimeList.net. An image (<img>) is 
                    used in the link to display the MyAnimeList.net icon. */}
                    <a href={anime?.url} target="_blank" rel="noreferrer">
                      <img
                        src={imgUrl}
                        height="28px"
                        width="28px"
                        alt=""
                        title="View at MyAnimeList.net"
                      />
                    </a>
                  </span>
                  {/* To create an internal link that redirects to the anime page based on its mal_id */}
                  <NavLink
                    key={`${anime.mal_id}-link`}
                    to={`/anime/${anime.mal_id}` && `/anime/${anime.mal_id}`}
                  >
                    <img src={anime.images.jpg.small_image_url} alt="top" />
                    <span className="sidebar-title">{anime.title}</span>
                  </NavLink>
                </div>
              ))}
          </div>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
