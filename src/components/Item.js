import React from "react";

const Item = ({ item, isHighlight, itemNo, handleClick }) => {
  const handleMouseClick = (e) => {
    e.preventDefault();
    handleClick(itemNo);
  };

  return (
    <div
      style={isHighlight ? { background: "#e2e8f0" } : {}}
      className="p-2 cursor-pointer"
      onClick={handleMouseClick}
      data-testid="suggestion-listItem"
    >
      {item}
    </div>
  );
};

export default Item;
