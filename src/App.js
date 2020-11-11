import { useEffect, useState } from "react";
import "./App.css";
import ItemList from "./componets/ItemList";

function App() {
  const [query, setQuery] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightNo, setHighlightNo] = useState(-1);
  const [hint, setHint] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // setHistory(JSON.parse(localStorage.getItem("history")).me || []);
    let items = JSON.parse(localStorage.getItem("history"));
    setHistory(items.my || []);
  }, [query]);

  const data = [
    "Ananya Kumari",
    "Ananya Tewari",
    "Ravi Varshney",
    "Ravi Shastri",
    "Ravi Kumar",
    "Ravichandran Ashwin",
    "Ravi Shankar",
    "Harsh Joshi",
    "Harsh Pandey",
    "Vishal Gaur",
    "Vishal Kumar",
  ];
  const handleChange = (e) => {
    setQuery(e.target.value);
    setDisplayText(e.target.value);

    if (e.target.value.length > 0) {
      history.reverse().every((item, index) => {
        if (item.toLowerCase().startsWith(e.target.value.toLowerCase())) {
          setHint(item);
          return false;
        }
        return true;
      });
      handleSuggestionsChange();
    } else {
      setSuggestions([]);
      setHint("");
    }
    setHighlightNo(-1);
  };
  const handleSuggestionsChange = () => {
    const filteredSuggestions = data.filter((i) =>
      i.toLowerCase().startsWith(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };
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
    if (e.key === "Tab" && hint.length > 0 && highlightNo === -1) {
      e.preventDefault();
      setSuggestions([]);
      setDisplayText(hint);
      setQuery(hint);
      setHighlightNo(-1);
      setHint("");
    }
  };

  const handleClick = (index) => {
    setDisplayText(suggestions[index]);
    setQuery(suggestions[index]);
    setHighlightNo(-1);
    handleSuggestionsChange();
  };

  const handleSearch = () => {
    localStorage.setItem(
      "history",
      JSON.stringify({ my: [...history, query] })
    );
  };

  return (
    <div className="App">
      {hint}
      <div className="search">
        <input
          type="text"
          value={displayText}
          onChange={(e) => handleChange(e)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ItemList
        items={suggestions}
        maxItems={5}
        highlightNo={highlightNo}
        handleClick={handleClick}
      />
    </div>
  );
}

export default App;
