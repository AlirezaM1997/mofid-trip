import { createContext } from "react";

type CalendarContextType = {
  cursor: number;
  setCursor: (cursor: number) => void;
  yearCursor: number;
  setYearCursor: (cursor: number) => void;
};

export const CalendarContext = createContext<CalendarContextType>(null);
