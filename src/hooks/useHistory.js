import { useEffect, useState } from "react";

const useHistory = (query, storageName) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem(storageName));
    setHistory(items.my || []);
  }, [query, storageName]);

  const updateHistory = () => {
    localStorage.setItem(
      storageName,
      JSON.stringify({ my: [...history, query] })
    );
  };
  return [history, updateHistory];
};

export default useHistory;