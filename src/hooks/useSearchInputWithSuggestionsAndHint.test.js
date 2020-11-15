/* eslint-disable no-unused-vars */
import { act, renderHook } from "@testing-library/react-hooks";
import useSearchInput from "./useSearchInputWithSuggestionsAndHint";

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

test("should use SearchInputSuggestionsAndHint", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  expect(hint).toBe("");
  expect(suggestions.length).toBe(0);
  expect(highlightNo).toBe(-1);
  expect(query).toBe("");
  expect(typeof handleChange).toBe("function");
  expect(typeof handleSearch).toBe("function");
  expect(typeof handleKeyDown).toBe("function");
});

test("should give 5 suggestions", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {} };
  e.target.value = "ravi";
  act(() => {
    handleChange(e);
  });
  expect(result.current[1].length).toBe(5);
});

test("should give hint Ravi Varshney", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {} };
  e.target.value = "Ravi Varshney";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  e.target.value = "rav";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  expect(result.current[2]).toBe("Ravi Varshney");
});

test("should give 0 as highlightNo", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {} };
  e.target.value = "Ravi Varshney";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  e.target.value = "rav";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  expect(result.current[2]).toBe("Ravi Varshney");

  e = { ...e, preventDefault: () => {}, key: "ArrowDown" };
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  act(() => {
    handleKeyDown(e);
  });

  expect(result.current[4]).toBe(0);
});

test("should give 4 as highlightNo", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {} };
  e.target.value = "Ravi Varshney";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  e.target.value = "rav";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  expect(result.current[2]).toBe("Ravi Varshney");

  e = { ...e, preventDefault: () => {}, key: "ArrowUp" };
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  act(() => {
    handleKeyDown(e);
  });

  expect(result.current[4]).toBe(4);
});

test("should give -1 as highlightNo", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {} };
  e.target.value = "Ravi Varshney";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  e.target.value = "rav";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  expect(result.current[2]).toBe("Ravi Varshney");

  e = { ...e, preventDefault: () => {}, key: "ArrowUp" };
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  act(() => {
    handleKeyDown(e);
  });
  expect(result.current[4]).toBe(4);

  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  e.key = "ArrowDown";
  act(() => {
    handleKeyDown(e);
  });
  expect(result.current[4]).toBe(-1);
});

test("should give 3 as highlightNo", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {} };
  e.target.value = "Ravi Varshney";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  e.target.value = "rav";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  expect(result.current[2]).toBe("Ravi Varshney");

  e = { ...e, preventDefault: () => {}, key: "ArrowUp" };
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  act(() => {
    handleKeyDown(e);
  });
  expect(result.current[4]).toBe(4);

  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  act(() => {
    handleKeyDown(e);
  });
  expect(result.current[4]).toBe(3);
});

test("should give -1 again as highlightNo", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {} };
  e.target.value = "Ravi Varshney";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  e.target.value = "rav";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  expect(result.current[2]).toBe("Ravi Varshney");

  e = { ...e, preventDefault: () => {}, key: "ArrowDown" };
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  act(() => {
    handleKeyDown(e);
  });
  expect(result.current[4]).toBe(0);
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  e.key = "ArrowUp";
  act(() => {
    handleKeyDown(e);
  });
  expect(result.current[4]).toBe(-1);
});

test("should give 1 suggestion and query as Ravi Varshney", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {} };
  e.target.value = "Ravi Varshney";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  e.target.value = "rav";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });

  e = { ...e, preventDefault: () => {}, key: "ArrowDown" };
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  act(() => {
    handleKeyDown(e);
  });
  expect(result.current[4]).toBe(0);
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  e.key = "ArrowRight";
  act(() => {
    handleKeyDown(e);
  });
  expect(result.current[4]).toBe(0);
  expect(result.current[1].length).toBe(1);
  expect(result.current[2]).toBe("Ravi Varshney");
  expect(result.current[6]).toBe("Ravi Varshney");
});

test("should give query as Ravi Varshney", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {}, preventDefault: () => {} };
  e.target.value = "Ravi Varshney";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });
  e.target.value = "rav";
  act(() => {
    handleChange(e);
    handleSearch(e.target.value);
  });

  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  e.key = "Tab";
  act(() => {
    handleKeyDown(e);
  });

  expect(result.current[2]).toBe("Ravi Varshney");
  expect(result.current[6]).toBe("Ravi Varshney");
});
test("should give hint as Ravi", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );

  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {}, preventDefault: () => {} };
  e.target.value = "Ravi";
  e.key = "Enter";
  act(() => {
    handleChange(e);
  });
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  act(() => {
    handleKeyDown(e);
  });
  expect(result.current[6]).toBe("");

  e.target.value = "rav";
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  act(() => {
    handleChange(e);
  });
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  expect(result.current[2]).toBe("Ravi");
});

test("should search the highligted suggestion", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );
  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: {}, preventDefault: () => {} };
  e.target.value = "Ravi";
  act(() => {
    handleChange(e);
  });
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  expect(suggestions.length).toBe(5);
  e.key = "ArrowDown";
  act(() => {
    handleKeyDown(e);
  });

  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  expect(highlightNo).toBe(0);
  e.key = "Enter";
  act(() => {
    handleKeyDown(e);
  });
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  e.target.value = "ra";
  act(() => handleChange(e));
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  expect(hint).toBe("Ravi Varshney");
});

test("should not search if query is empty", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );
  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  expect(query).toBe("");
  act(() => {
    handleSearch("");
  });

  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  expect(query).toBe("");
});

test("should search with param", () => {
  const { result } = renderHook(() =>
    useSearchInput({ data, search: () => {} })
  );
  let [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  let e = { target: { value: "Ravi" }, preventDefault: () => {} };
  act(() => {
    handleChange(e);
  });
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;

  act(() => {
    handleSearch();
  });
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  expect(query).toBe("");
  e.target.value = "rav";
  act(() => {
    handleChange(e);
  });
  [
    handleKeyDown,
    suggestions,
    hint,
    handleChange,
    highlightNo,
    handleSearch,
    query,
  ] = result.current;
  expect(hint).toBe("Ravi");
});
