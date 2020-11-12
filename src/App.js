import { useState } from "react";
import {
  Switch,
  Route,
  useHistory as useRouterHistory,
} from "react-router-dom";
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
  const [query, setQuery] = useState("");
  const routerHistory = useRouterHistory();

  const search = (q) => {
    setResult(q);
    routerHistory.push("/search");
  };
  return (
    <div className="flex flex-col  justify-center mt-20 items-center">
      <Switch>
        <Route exact path="/">
          <SearchBar
            data={data}
            search={search}
            query={query}
            setQuery={setQuery}
          />
        </Route>
        <Route path="/search">
          <SearchResult result={result} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
