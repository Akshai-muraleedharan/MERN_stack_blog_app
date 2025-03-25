  import React from "react";
import useThemeStore from "../../store/themeStore";

  const Loader = () => {

  const {theme} = useThemeStore()

    return (
      <div className={theme === 'dark' ? "min-h-screen flex flex-col bg-dark-bg justify-center items-center" : "min-h-screen flex flex-col  justify-center items-center"}>
        <span className={theme === 'dark' ? "loading loading-dots bg-dark-spinners-color loading-xl" : "loading loading-dots loading-xl"}></span>
        <p className={theme === 'dark' ? "text-center text-dark-smalls-text"  : "text-center text-black"}>Loading...</p>
      </div>
    );
  };

  export default Loader;
