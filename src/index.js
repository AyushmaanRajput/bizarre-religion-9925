import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "../src/Context/Auth/AuthContextProvider";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
import "@fontsource/open-sans";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f0faf4",
      100: "#d1f3e0",
      200: "#a3e9c5",
      300: "#74dfaa",
      400: "#46d590",
      500: "#19cb75", // Main brand color
      600: "#14a063",
      700: "#0e7e4e",
      800: "#095b39",
      900: "#043925",
    },
  },
  fonts: {
    heading: `"Inter", sans-serif`,
    body: `"Inter", sans-serif`,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </AuthContextProvider>
);
