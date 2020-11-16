import React from "react";
const SearchResult = ({ result, setResult }) => {
  return (
    <>
      <p data-testid="result" className="text-4xl">
        {result}
      </p>
      <p
        className="cursor-pointer"
        data-testid="back"
        onClick={() => setResult("")}
      >
        &#8592; Go back
      </p>
    </>
  );
};

export default SearchResult;
