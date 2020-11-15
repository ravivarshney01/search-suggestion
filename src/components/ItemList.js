import React from "react";
import Item from "./Item";

const ItemList = ({ items, highlightNo, maxItems, handleClick }) => {
  return (
    <div data-testid="suggestion-list">
      {items.length > 0 && (
        <div className="bg-teal-lightest border-b-4 border-teal rounded-b text-teal-darkest px-4 py-3 shadow-md my-2 ">
          {items.map((item, i) => {
            if (i < maxItems) {
              const isHighlight = highlightNo === i;
              return (
                <div key={i}>
                  <Item
                    item={item}
                    isHighlight={isHighlight}
                    itemNo={i}
                    handleClick={handleClick}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default ItemList;
