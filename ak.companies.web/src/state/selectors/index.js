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
  get: ({ get }) => {
    const e = get(errors);
    if (e) {
      return JSON.stringify(e, null, 2);
    } else {
      return e;
    }
  },
  set: ({ set }) => set(errors, null),
});

export const notificationSelector = selector({
  key: "notificationSelector",
  get: ({ get }) => get(notification),
  set: ({ set }) => set(notification, null),
});
