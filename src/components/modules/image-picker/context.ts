import { createContext } from "react";

export const FilesContext = createContext({
    selectedFiles: [],
    setSelectedFiles: ([]) => {}
});
