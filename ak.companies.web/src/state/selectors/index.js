import { selector } from "recoil";
import { allCompanies, selectedCompany, errors, notification } from "../atoms";

export const companyCountSelector = selector({
  key: "companyCount",
  get: ({ get }) => get(allCompanies).length,
});

export const selectedCompanySelector = selector({
  key: "selectedCompanySelector",
  get: ({ get }) => get(selectedCompany),
});

export const errorsSelector = selector({
  key: "errorsSelector",
  get: ({ get }) => get(errors),
});
