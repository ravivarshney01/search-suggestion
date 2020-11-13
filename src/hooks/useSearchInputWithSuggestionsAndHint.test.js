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
