import { createContext } from 'react';
export const ThemeContext = createContext({
    inputRef: () => {},
    mouseOverCell: () => {},
    mouseOverRowSum: () => {},
    mouseOutRowSum: () => {},
    removeRow: () => {},
    addRow: () => {}
  });