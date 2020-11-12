import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBar from "./componets/SearchBar";
import SearchResult from "./componets/SearchResult";

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

  return (
    <div className="flex flex-col  justify-center mt-20 items-center">
      <Router>
        <Switch>
          <Route exact path="/">
            <SearchBar data={data} setResult={setResult} />
          </Route>
          <Route path="/search">
            <SearchResult result={result} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
