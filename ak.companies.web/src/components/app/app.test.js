import React from "react";
import { render } from "@testing-library/react";
import App from ".";

test("renders swagger ui link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/swagger ui/i);
  expect(linkElement).toBeInTheDocument();
});
