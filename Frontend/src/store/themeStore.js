    import { create } from "zustand";
    import { persist } from "zustand/middleware";
    import { devtools } from "zustand/middleware";
    import { THEME_TYPES } from "../constants";

    const {THEME_DARK,THEME_LIGHT} = THEME_TYPES
    const useThemeStore = create(
        devtools(persist((set) => ({
        theme:THEME_LIGHT,
        toggleTheme: () => set((state) => ({theme : state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT}))
    }),
    {
        name:"theme-data",
        getStorage: () => localStorage,
    }
    ), {name : "theme"}))

    export default useThemeStore