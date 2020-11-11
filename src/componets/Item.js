import React from "react";

const Item = ({ item, isHighlight, itemNo, handleClick }) => {
  const handleMouseClick = (e) => {
    e.preventDefault();
    handleClick(itemNo);
  };

  return (
    <div>
      <li
        style={isHighlight ? { color: "red" } : { color: "black" }}
        onClick={handleMouseClick}
      >
        {item}
      </li>
    </div>
  );
};

export default Item;
