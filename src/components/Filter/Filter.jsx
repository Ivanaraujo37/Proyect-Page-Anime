import React from "react";
import "./Filter.css";

// Unstructures the props passed to the component, which include the fetchFilter and handleClose functions, as well as the filter object.
/* event handler that is executed when the button is clicked. 
The function closes the filter menu by calling handleClose() and then calls fetchFilter() passing the name of the filter filter.name .*/
const Filter = ({ fetchFilter, filter, handleClose }) => {
  
  return (
    <button
      className="filter-button"
      onClick={() => {
        handleClose();
        fetchFilter(`${filter.name}`);
      }}
    >
      {/* Is an icon related to the filter, and filter.name , which is the name of the filter. */}
      {filter.icon}
      {filter.name}
    </button>
  );
};
export default Filter;
