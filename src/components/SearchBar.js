import React from "react";
import PropTypes from "prop-types";
import ItemList from "./ItemList";
import useSearchInput from "../hooks/useSearchInputWithSuggestionsAndHint";

const SearchBar = ({ data, search }) => {
  const [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = useSearchInput({ data, search });

  return (
    <div>
      {hint.length > 0 ? (
        <div className="absolute text-xs bg-gray-100 rounded py-1 px-4 -my-8 bottom-full">
          {hint}
          <svg
            className="absolute text-gray-400 h-2 my-1  top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      ) : null}
      <div className="flex border border-gray-200 rounded-full p-4 shadow text-xl ">
        <input
          autoFocus
          type="text"
          className="w-full outline-none px-3"
          value={query}
          onChange={(e) => handleChange(e)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          <svg
            className="text-gray-600 h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
      <ItemList
        items={suggestions}
        maxItems={5}
        highlightNo={highlightNo}
        handleClick={(index) => handleSearch(suggestions[index])}
      />
    </div>
  );
};

SearchBar.propTypes = {
  data: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default SearchBar;
