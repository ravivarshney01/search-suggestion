import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
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
describe("<SearchBar />", () => {
  it("renders <SearchBar /> correctly", () => {
    const { getByTestId } = render(<SearchBar data={data} search={() => {}} />);
    const input = getByTestId("input");
    const button = getByTestId("button");
    expect(input.tagName).toBe("INPUT");
    expect(button.tagName).toBe("BUTTON");
  });

  it("renders 5 suggestions", () => {
    const { getByTestId, getAllByTestId } = render(
      <SearchBar data={data} search={() => {}} />
    );
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "rav" } });
    const suggestions = getAllByTestId("suggestion-listItem");
    expect(suggestions.length).toBe(5);
  });

  it("Ravi Varshney should be highlighted", () => {
    const { getByTestId } = render(<SearchBar data={data} search={() => {}} />);
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "rav" } });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const rv = screen.getByText("Ravi Varshney");
    expect(window.getComputedStyle(rv).background).toBe("rgb(226, 232, 240)");
  });

  it("Ravi Shanker should be highlighted", () => {
    const { getByTestId } = render(<SearchBar data={data} search={() => {}} />);
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "rav" } });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    const rs = screen.getByText("Ravi Shankar");
    const rv = screen.getByText("Ravi Varshney");
    expect(window.getComputedStyle(rv).background).toBe("");
    expect(window.getComputedStyle(rs).background).toBe("rgb(226, 232, 240)");
  });
  it("Ravi Varshney should be searched and shouldd be in hint while typing ra", () => {
    const { getByTestId } = render(
      <SearchBar
        data={data}
        search={(q) => {
          console.log(q);
        }}
      />
    );
    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: "rav" } });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const rv = screen.getByText("Ravi Varshney");
    fireEvent.click(rv);
    fireEvent.change(input, { target: { value: "ra" } });
    const hint = getByTestId("hint");
    expect(hint.childNodes[0].textContent).toBe("Ravi Varshney");
  });
});
