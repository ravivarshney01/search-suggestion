import React from "react";
import { render, screen } from "@testing-library/react";
import ItemList from "./ItemList";

describe("<ItemList />", () => {
  it("renders <ItemList /> correctly", () => {
    render(
      <ItemList
        highlightNo={-1}
        maxItems={5}
        items={["Ravi Varshney", "Ravi Shastri"]}
      />
    );
    expect(screen.getByText("Ravi Varshney")).toBeInTheDocument();
    expect(screen.getByText("Ravi Shastri")).toBeInTheDocument();
  });
  it("renders only 5 <Item /> when 6 items provided", () => {
    const { getAllByTestId } = render(
      <ItemList
        highlightNo={-1}
        maxItems={5}
        items={[
          "Ravi Varshney",
          "Ravi Shastri",
          "Ravi Kumar",
          "Ravichandran Ashwin",
          "Ravi Shankar",
          "Harsh Joshi",
        ]}
      />
    );

    const suggestions = getAllByTestId("suggestion-listItem");
    expect(suggestions.length).toBe(5);
  });
});
