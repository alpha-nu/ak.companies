import { atom } from "recoil";

export const drawerOpen = atom({
  key: "drawerOpen",
  default: true,
});

export const allCompanies = atom({
  key: "allCompanies",
  default: [],
});
