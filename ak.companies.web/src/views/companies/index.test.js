import React from "react";
import { render, cleanup } from "@testing-library/react";
import Companies from "./index";
import { useApi } from "../../hooks/useApi";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useRecoilState } from "recoil";

jest.mock("../../hooks/useApi");
jest.mock("recoil");

afterEach(cleanup);

test("renders loader while fetching", () => {
  useRecoilState.mockReturnValue([[], jest.fn()]);

  useApi.mockReturnValue({
    loading: true,
  });

  const { getByText } = render(<Companies />);

  expect(getByText("Just a sec...")).toBeInTheDocument();
});

test("renderes list of companies", async () => {
  useRecoilState.mockReturnValue([
    [
      {
        name: "company 1",
        isin: "AA1111111111",
        ticker: "comp1",
        id: 1,
      },
      {
        name: "company 2",
        isin: "AA2222222222",
        ticker: "comp2",
        id: 2,
        website: "http://comp2.com",
      },
    ],
    jest.fn(),
  ]);

  useApi.mockReturnValue({
    loading: false,
  });

  const { getByText } = render(
    <Router history={createMemoryHistory()}>
      <Companies />
    </Router>
  );

  expect(getByText("New Company").closest("a").getAttribute("href")).toBe(
    "/companies/new"
  );
  expect(getByText("company 1")).toBeInTheDocument();
  expect(getByText("company 2")).toBeInTheDocument();
});
