import React from "react";
import { createContext, useState } from "react"

const AutoSaveContext = createContext();

export const AutoSaveProvider = ({children}) => {
    const [isReload, setIsReload] = useState(false);

    return (
        <AutoSaveContext.Provider value={{isReload, setIsReload}}>
            {children}
        </AutoSaveContext.Provider>
    )
}

export default AutoSaveContext;