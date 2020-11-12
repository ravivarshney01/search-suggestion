import { useEffect, useState } from "react";

const useHistory = (query, storageName) => {
  const [history, setHistory] = useState([]);
  const [hint, setHint] = useState("");
  useEffect(() => {
    let items = JSON.parse(localStorage.getItem(storageName));
    if (items) {
      setHistory(items.my);
    } else {
      setHistory([]);
    }
  }, [query, storageName]);

  const updateHistory = () => {
    localStorage.setItem(
      storageName,
      JSON.stringify({ my: [...history, query] })
    );
  };
  const handleHintChange = (q) => {
    history.reverse().every((item, index) => {
      if (item.toLowerCase().startsWith(q.toLowerCase())) {
        setHint(item);
        return false;
      }
      setHint("");
      return true;
    });
  };

  const Hint = () => {
    return (
      <>
        {hint.length > 0 ? (
          <div className="absolute text-xs bg-gray-100 rounded py-1 px-4 -my-8 bottom-full">
            {hint}
            <svg
              className="absolute text-gray-400 h-2 my-1  top-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          </div>
        ) : null}
      </>
    );
  };

  return [Hint, handleHintChange, hint, setHint, updateHistory];
};

export default useHistory;
