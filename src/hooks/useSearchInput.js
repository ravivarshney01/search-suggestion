import React, { useRef, useState } from "react";
import useHistory from "./useHistory";
import useSuggestions from "./useSuggestions";

const useSearchInput = ({ data, query, setQuery, search }) => {
  const [displayText, setDisplayText] = useState("");
  const searchRef = useRef(null);
  const [
    suggestions,
    setSuggestions,
    handleSuggestionsChange,
    highlightNo,
    setHighlightNo,
    SuggestionsList,
  ] = useSuggestions({ data, setDisplayText, setQuery, searchRef });
  const [Hint, handleHintChange, hint, setHint, updateHistory] = useHistory(
    displayText,
    "history"
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    setDisplayText(e.target.value);

    if (e.target.value.length > 0) {
      handleHintChange(e.target.value);
      handleSuggestionsChange(e.target.value);
    } else {
      setSuggestions([]);
      setHint("");
    }
    setHighlightNo(-1);
  };

  const handleSearch = () => {
    if (query.length > 0) {
      updateHistory();
      search(displayText);
    }
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
        handleHintChange(value);
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

  const SearchInput = () => {
    return (
      <input
        ref={searchRef}
        autoFocus
        type="text"
        className="w-full outline-none px-3"
        value={displayText}
        onChange={(e) => handleChange(e)}
        onKeyDown={handleKeyDown}
      />
    );
  };

  return [SearchInput, Hint, handleSearch, SuggestionsList];
};

export default useSearchInput;
