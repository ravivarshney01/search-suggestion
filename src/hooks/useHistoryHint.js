import { useState } from "react";

const useHistoryHint = (storageName) => {
  const [hint, setHint] = useState("");

  const getHistory = () => {
    let items = localStorage.getItem(storageName);
    items = JSON.parse(items);
    return items ? items.my : [];
  };

  const addToHistory = (q) => {
    localStorage.setItem(
      storageName,
      JSON.stringify({ my: [...getHistory(), q] })
    );
  };
  const refreshHint = (q) => {
    if (q.length > 0) {
      getHistory()
        .reverse()
        .every((item, index) => {
          if (item.toLowerCase().startsWith(q.toLowerCase())) {
            setHint(item);
            return false;
          }
          setHint("");
          return true;
        });
    } else {
      setHint("");
    }
  };

  return [hint, addToHistory, refreshHint];
};

export default useHistoryHint;
