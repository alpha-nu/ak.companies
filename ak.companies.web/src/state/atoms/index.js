import { atom } from "recoil";

export const drawerOpen = atom({
  key: "drawerOpen",
  default: true,
});

export const allCompanies = atom({
  key: "allCompanies",
  default: [],
});

export const selectedCompany = atom({
  key: "selectedCompany",
  default: null,
});

export const errors = atom({
  key: "erros",
  default: [],
});

export const notification = atom({
  key: "notification",
  default: null,
});
