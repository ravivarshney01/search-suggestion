import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Item from "./Item";

describe("<Item />", () => {
  it("renders <Item /> correctly", () => {
    render(<Item isHighlight={false} item="Ravi Varshney" itemNo={0} />);
    expect(screen.getByText("Ravi Varshney")).toBeInTheDocument();
  });

  it("renders colors correctly", () => {
    render(<Item isHighlight={false} item="Ravi Varshney" itemNo={0} />);
    render(<Item isHighlight={true} item="Ravi Shastri" itemNo={1} />);
    const rv = screen.getByText("Ravi Varshney");
    const rs = screen.getByText("Ravi Shastri");

    expect(window.getComputedStyle(rv).background).toBe("");
    expect(window.getComputedStyle(rs).background).toBe("rgb(226, 232, 240)");
  });
  it("fires a event on click", () => {
    render(
      <Item
        isHighlight={false}
        item="Ravi Varshney"
        itemNo={1}
        handleClick={(i) => console.log(i)}
      />
    );
    console.log = jest.fn();

    const rv = screen.getByText("Ravi Varshney");
    fireEvent.click(rv);

    expect(console.log).toBeCalledWith(1);
  });
});
