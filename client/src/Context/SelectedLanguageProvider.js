import React, {createContext, useContext, useState} from "react";

export const SelectedLanguageContext = createContext();

export const SelectedLanguageProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState("");

    return (
        <SelectedLanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage }}
        >
            {children}
        </SelectedLanguageContext.Provider>
    );
};

export const useSelectedLanguage = () => {
    const context = useContext(SelectedLanguageContext);
    if (!context) {
        throw new Error(
            "useSelectedLanguage must be used within a SelectedLanguageProvider"
        );
    }
    return context;
};
