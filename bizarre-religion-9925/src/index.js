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
      50: "#f3fbe5",
      100: "#e0f7b0",
      200: "#c9f17a",
      300: "#b9ff4b", // Base color
      400: "#a2e723",
      500: "#8ac900",
      600: "#71b400",
      700: "#599100",
      800: "#406d00",
      900: "#254900",
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
