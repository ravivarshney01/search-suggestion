import React from "react";

const Item = ({ item, isHighlight, itemNo, handleClick }) => {
  const handleMouseClick = (e) => {
    e.preventDefault();
    handleClick(itemNo);
  };

  return (
    <div
      className="p-2"
      style={isHighlight ? { background: "#f2f2f2" } : { background: "white" }}
      onClick={handleMouseClick}
    >
      {item}
    </div>
  );
};

export default Item;
