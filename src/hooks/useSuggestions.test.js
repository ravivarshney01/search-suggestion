import { act, renderHook } from "@testing-library/react-hooks";
import useSuggestions from "./useSuggestions";

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

test("should use suggestions", () => {
  const { result } = renderHook(() => useSuggestions(data));
  let [suggestions, refreshSuggestions] = result.current;
  expect(suggestions.length).toBe(0);
  expect(typeof refreshSuggestions).toBe("function");
});

test("should give 5 suggestions", () => {
  const { result } = renderHook(() => useSuggestions(data));
  let [suggestions, refreshSuggestions] = result.current;
  expect(suggestions.length).toBe(0);
  act(() => refreshSuggestions("ravi"));
  expect(result.current[0].length).toBe(5);
});

test("2nd suggestion should be Ravi Shasti", () => {
  const { result } = renderHook(() => useSuggestions(data));
  let [suggestions, refreshSuggestions] = result.current;
  expect(suggestions.length).toBe(0);
  act(() => refreshSuggestions("ravi"));
  expect(result.current[0][1]).toBe("Ravi Shastri");
});

test("should give 0 suggestions if query is empty", () => {
  const { result } = renderHook(() => useSuggestions(data));
  let [suggestions, refreshSuggestions] = result.current;
  expect(suggestions.length).toBe(0);
  act(() => refreshSuggestions(""));
  expect(result.current[0].length).toBe(0);
});
