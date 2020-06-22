import { selector } from "recoil";
import { allCompanies } from "../atoms";

export const companyCountSelector = selector({
  key: "companyCount",
  get: ({ get }) => get(allCompanies).length,
});
