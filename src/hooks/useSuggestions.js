import { useState } from "react";
import ItemList from "../components/ItemList";

const useSuggestions = ({ data, setDisplayText, setQuery, searchRef }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [highlightNo, setHighlightNo] = useState(-1);

  const handleSuggestionsChange = (q) => {
    const filteredSuggestions = data.filter((i) =>
      i.toLowerCase().startsWith(q.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };
  const handleClick = (index) => {
    setDisplayText(suggestions[index]);
    setQuery(suggestions[index]);
    setHighlightNo(-1);
    handleSuggestionsChange(suggestions[index]);
    searchRef.current.focus();
  };
  const SuggestionsList = () => {
    return (
      <ItemList
        items={suggestions}
        maxItems={5}
        highlightNo={highlightNo}
        handleClick={handleClick}
      />
    );
  };

  return [
    suggestions,
    setSuggestions,
    handleSuggestionsChange,
    highlightNo,
    setHighlightNo,
    SuggestionsList,
  ];
};

export default useSuggestions;
