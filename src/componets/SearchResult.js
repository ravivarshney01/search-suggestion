import React from "react";
import { Link } from "react-router-dom";
const SearchResult = ({ result }) => {
  return (
    <div>
      <p className="text-4xl">{result}</p>
      <Link to="/" className="">
        &#8592; Go back
      </Link>
    </div>
  );
};

export default SearchResult;
