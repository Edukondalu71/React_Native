import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const colorScheme = useColorScheme();
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [color, setColor] = useState('#FFFFFF');

    useEffect(() => {
        setBgColor(colorScheme === 'dark' ? '#000000' : '#FFFFFF');
        setColor(colorScheme === 'dark' ? '#FFFFFF' : '#000000');
    }, [colorScheme])

    return (
        <ThemeContext.Provider value={{ color, bgColor }}>
            {children}
        </ThemeContext.Provider>
    )
}
export { ThemeContext, ThemeProvider }