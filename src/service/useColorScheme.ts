import { useEffect, useState } from "react";
import { type ColorScheme } from "../data/colors";

const STORAGE_KEY = "color-scheme";
const DEFAULT: ColorScheme = "slate";

export function useColorScheme() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
        return (localStorage.getItem(STORAGE_KEY) ?? DEFAULT) as ColorScheme;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, colorScheme);
    }, [colorScheme]);

    return { colorScheme, setColorScheme };
}
