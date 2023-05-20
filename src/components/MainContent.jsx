import React from "react";
import AnimeCard from "./AnimeCard";
import Filter from "./Filter/Filter";
import { Button, Menu, Fade } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function MainContent(props) {
  //Initializes its value to null and provides a setAnchorEl function to update its value
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    // When a click occurs, anchorEl will update with the element that was clicked.
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // Will be used as a controller to close the dropdown. Sets the value of anchorEl to null, indicating that the menu is closed.
    setAnchorEl(null);
  };

  const fetchFilter = (name) => {
    // They represent the different filters available to apply on the component and will be used to display filtering options.
    props.handleFilter(name);
  };
  // creates a list of available filters, where each filter has a name and an associated icon. 
  // These filters will be used to display filter options in the component.
  const filters = [
    { name: "popular", icon: <FavoriteIcon /> },
    { name: "upcoming", icon: <CalendarMonthIcon /> },
    { name: "favorite", icon: <StarIcon /> },
    { name: "airing", icon: <LiveTvIcon /> },
  ];

  return (
    <main>
      <div className="main-head">
        <form className="search-box" onSubmit={props.handleSearch}>
          <Button
            className="filter-anime"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="contained"
          >
            Filter
          </Button>
          {/* The menu is activated by clicking the filter button. The filters array is mapped and a <Filter> component is created for each filter. 
          The <Filter> component receives several props, including fetchFilter, filter, and handleClose. */}
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {filters.map((filter) => {
              return (
                <Filter
                  fetchFilter={fetchFilter}
                  filter={filter}
                  handleClose={handleClose}
                />
              );
            })}
          </Menu>
          {/* The value of the input field is set to props.search and the onChange function is hooked to update the search state in props.setSearch. */}
          <input
            type="search"
            placeholder="Search for an anime"
            required
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="anime-list">
        {/* maps the props.animeList array and creates an <AnimeCard> component for each item in the list. */}
        {/* Each <AnimeCard> component has a unique key set to anime.mal_id to help React perform efficient rendering. */}
        {props &&
          props.animeList?.map((anime) => (
            <AnimeCard anime={anime} key={anime.mal_id} /> 
          ))}
      </div>
    </main>
  );
}
export default MainContent;
