import { ThemeProvider } from "@mui/private-theming";

import { useEffect } from "react";
import "../styles/globals.css";
import { StoreProvider } from "../utils/store";
import { SnackbarProvider } from "notistack";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <StoreProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
