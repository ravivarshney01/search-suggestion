import React, { useRef, useState } from "react";
import ItemList from "./ItemList";
import useHistory from "../hooks/useHistory";
import PropTypes from "prop-types";

const SearchBar = ({ data, search, query, setQuery }) => {
  const [displayText, setDisplayText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightNo, setHighlightNo] = useState(-1);
  const [hint, setHint] = useState("");
  const [history, updateHistory] = useHistory(displayText, "history");
  const searchRef = useRef(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setDisplayText(e.target.value);

    if (e.target.value.length > 0) {
      handleHintChange();
      handleSuggestionsChange(e.target.value);
    } else {
      setSuggestions([]);
      setHint("");
    }
    setHighlightNo(-1);
  };
  const handleSuggestionsChange = (q) => {
    const filteredSuggestions = data.filter((i) =>
      i.toLowerCase().startsWith(q.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };
  const handleHintChange = () => {
    history.reverse().every((item, index) => {
      if (
        item.toLowerCase().startsWith(searchRef.current.value.toLowerCase())
      ) {
        setHint(item);
        return false;
      }
      setHint("");
      return true;
    });
  };
  const handleKeyDown = (e) => {
    const value = e.target.value;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (highlightNo + 1 < suggestions.length) {
        setDisplayText(suggestions[highlightNo + 1]);
        setHighlightNo(highlightNo + 1);
      } else {
        setDisplayText(query);
        setHighlightNo(-1);
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (highlightNo > 0) {
        setDisplayText(suggestions[highlightNo - 1]);
        setHighlightNo(highlightNo - 1);
      } else if (highlightNo === 0) {
        setDisplayText(query);
        setHighlightNo(-1);
      } else {
        setDisplayText(suggestions[suggestions.length - 1]);
        setHighlightNo(suggestions.length - 1);
      }
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (highlightNo !== -1) {
        setQuery(displayText);
        handleHintChange();
        handleSuggestionsChange(value);
      }
    }
    if (e.key === "Tab" && hint.length > 0 && highlightNo === -1) {
      e.preventDefault();
      setSuggestions([]);
      setDisplayText(hint);
      setQuery(hint);
      setHighlightNo(-1);
      setHint("");
    }
    if (e.key === "Enter" && query.length > 0) {
      handleSearch();
    }
  };

  const handleClick = (index) => {
    setDisplayText(suggestions[index]);
    setQuery(suggestions[index]);
    setHighlightNo(-1);
    handleSuggestionsChange(suggestions[index]);
    searchRef.current.focus();
  };

  const handleSearch = () => {
    if (query.length > 0) {
      updateHistory();
      search(displayText);
    }
  };

  let hintAlert;
  if (hint.length > 0 && highlightNo === -1) {
    hintAlert = (
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
    );
  } else {
    hintAlert = null;
  }
  return (
    <div>
      {hintAlert}

      <div className="flex border border-gray-200 rounded-full p-4 shadow text-xl ">
        <input
          ref={searchRef}
          autoFocus
          type="text"
          className="w-full outline-none px-3"
          value={displayText}
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
        handleClick={handleClick}
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
