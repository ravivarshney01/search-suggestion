import { useState } from "react";
import useHistoryHint from "./useHistoryHint";
import useSuggestions from "./useSuggestions";

const useSearchInput = ({ data, search }) => {
  const [query, setQuery] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [highlightNo, setHighlightNo] = useState(-1);
  const [suggestions, refreshSuggestions] = useSuggestions(data);
  const [hint, addToHistory, refreshHint] = useHistoryHint("history");

  const handleKeyDown = (e) => {
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
    if (e.key === "ArrowRight" && highlightNo !== -1) {
      e.preventDefault();
      setQuery(displayText);
      refreshSuggestions(displayText);
      refreshHint(displayText);
    }
    if (e.key === "Tab" && hint.length > 0 && highlightNo === -1) {
      e.preventDefault();
      setDisplayText(hint);
      setQuery(hint);
      setHighlightNo(-1);
    }
    if (e.key === "Enter") {
      if (highlightNo === -1) {
        handleSearch(query);
      } else {
        handleSearch(displayText);
      }
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    refreshSuggestions(e.target.value);
    refreshHint(e.target.value);
    setHighlightNo(-1);
  };
  const handleSearch = (q = query) => {
    if (q.length > 0) {
      addToHistory(q);
      setQuery("");
      setDisplayText("");
      search(q);
    }
  };
  return [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ];
};

export default useSearchInput;
