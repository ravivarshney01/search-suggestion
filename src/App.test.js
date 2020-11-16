import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("renders <App /> correctly", () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("input");
    const button = getByTestId("button");
    expect(input.tagName).toBe("INPUT");
    expect(button.tagName).toBe("BUTTON");
  });

  it("renders 5 suggestions", () => {
    const { getByTestId, getAllByTestId } = render(<App />);
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "rav" } });
    const suggestions = getAllByTestId("suggestion-listItem");
    expect(suggestions.length).toBe(5);
  });

  it("Ravi Varshney should be highlighted", () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "rav" } });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const rv = screen.getByText("Ravi Varshney");
    expect(window.getComputedStyle(rv).background).toBe("rgb(226, 232, 240)");
  });

  it("Ravi Shanker should be highlighted", () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "rav" } });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    const rs = screen.getByText("Ravi Shankar");
    const rv = screen.getByText("Ravi Varshney");
    expect(window.getComputedStyle(rv).background).toBe("");
    expect(window.getComputedStyle(rs).background).toBe("rgb(226, 232, 240)");
  });
  it("Ravi Varshney should be searched and should be in hint while typing ra", () => {
    const { getByTestId } = render(<App />);
    let input = getByTestId("input");
    fireEvent.change(input, { target: { value: "rav" } });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const rv = screen.getByText("Ravi Varshney");
    fireEvent.click(rv);
    expect(getByTestId("result").innerHTML).toBe("Ravi Varshney");
    const back = getByTestId("back");
    fireEvent.click(back);
    input = getByTestId("input");
    fireEvent.change(input, { target: { value: "ra" } });
    const hint = getByTestId("hint");
    expect(hint.childNodes[0].textContent).toBe("Ravi Varshney");
  });
});
