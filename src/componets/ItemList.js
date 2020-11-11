import React from "react";
import Item from "./Item";

const ItemList = ({ items, highlightNo, maxItems, handleClick }) => {
  return (
    <div>
      <ul style={{ listStyleType: "none", paddingInlineStart: 0 }}>
        {items.length > 0 &&
          items.map((item, i) => {
            if (i < maxItems) {
              const isHighlight = highlightNo === i;
              return (
                <Item
                  item={item}
                  key={i}
                  isHighlight={isHighlight}
                  itemNo={i}
                  handleClick={handleClick}
                />
              );
            }
            return null;
          })}
      </ul>
    </div>
  );
};

export default ItemList;
