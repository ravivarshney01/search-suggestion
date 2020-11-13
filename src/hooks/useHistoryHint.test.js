import { act, renderHook } from "@testing-library/react-hooks";
import useHistoryHint from "./useHistoryHint";

test("should use hint", () => {
  const { result } = renderHook(() => useHistoryHint("history"));
  let [hint, addtoHistory, refreshHint] = result.current;
  expect(hint).toBe("");
  expect(typeof addtoHistory).toBe("function");
  expect(typeof refreshHint).toBe("function");
});

test("should get Ravi Shastri", () => {
  const { result } = renderHook(() => useHistoryHint("history"));
  let [hint, addtoHistory, refreshHint] = result.current;
  expect(hint).toBe("");
  act(() => addtoHistory("Ravi Varshney"));
  act(() => addtoHistory("Ravi Shastri"));
  act(() => refreshHint("ra"));
  expect(result.current[0]).toBe("Ravi Shastri");
});

test("should get Ravi Varshney", () => {
  const { result } = renderHook(() => useHistoryHint("history"));
  let [hint, addtoHistory, refreshHint] = result.current;
  expect(hint).toBe("");
  act(() => addtoHistory("Ravi Varshney"));
  act(() => addtoHistory("Ravi Shastri"));
  act(() => refreshHint("ravi v"));
  expect(result.current[0]).toBe("Ravi Varshney");
});
