import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Company from "./company";

afterEach(cleanup);

test("create/update a company", () => {
  const action = jest.fn();
  const set = jest.fn();
  const company = { name: "", isin: "", ticker: "", website: "" };

  const { container } = render(
    <Company
      company={company}
      setCompany={set}
      submit={{ label: "save", action }}
    />
  );
  const event = (value) => ({ target: { value } });
  const [name, isin, ticker, website] = container.querySelectorAll("input");
  fireEvent.change(name, event("Acme Inc."));
  fireEvent.change(isin, event("AA1234567890"));
  fireEvent.change(ticker, event("ACME"));
  fireEvent.change(website, event("acme.com"));
  fireEvent.click(container.querySelector("button"));

  expect(action).toHaveBeenCalled();
  expect(set).toHaveBeenNthCalledWith(1, {
    name: "Acme Inc.",
    isin: "",
    ticker: "",
    website: "",
  });
  expect(set).toHaveBeenNthCalledWith(2, {
    name: "",
    isin: "AA1234567890",
    ticker: "",
    website: "",
  });
  expect(set).toHaveBeenNthCalledWith(3, {
    name: "",
    isin: "",
    ticker: "ACME",
    website: "",
  });
  expect(set).toHaveBeenNthCalledWith(4, {
    name: "",
    isin: "",
    ticker: "",
    website: "acme.com",
  });
});
