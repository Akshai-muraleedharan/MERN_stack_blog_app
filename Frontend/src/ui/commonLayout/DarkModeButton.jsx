  import React, { useEffect, useState } from 'react'
  import useThemeStore from '../../store/themeStore'
  import {applyThemePreference} from '../../utils/themeUtils'
  import { FiSun } from "react-icons/fi";
  import { IoMoonOutline } from "react-icons/io5";
  const DarkModeButton = () => {
    const [dark,setDark] = useState(false)
    const toggleTheme = useThemeStore((state) => state.toggleTheme)
    const theme = useThemeStore((state) => state.theme)

    useEffect(() => {
        applyThemePreference(theme)
        if( theme === "dark"){
            setDark(true)
        }else{
            setDark(false)
        }
    },[theme])

  return (
    <button onClick={toggleTheme} className={dark ? "cursor-pointer text-white px-3 py-2 rounded-2xl border-gray-200 border-2" : "cursor-pointer text-black px-3 py-2 rounded-2xl border-gray-400 border-2 "}>{dark ? <FiSun size={20} stroke='yellow' strokeWidth={2} /> : <IoMoonOutline  size={20} />}</button>
  )
}

export default DarkModeButton