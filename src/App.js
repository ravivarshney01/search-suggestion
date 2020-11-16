import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";

function App() {
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
  const [result, setResult] = useState("");

  const search = (q) => {
    setResult(q);
  };
  return (
    <div className="flex flex-col  justify-center mt-20 items-center">
      {result.length === 0 ? (
        <SearchBar data={data} search={search} />
      ) : (
        <SearchResult result={result} setResult={setResult} />
      )}
    </div>
  );
}

export default App;
