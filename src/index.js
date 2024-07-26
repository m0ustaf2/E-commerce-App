import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import App from "./App";
import AuthContextProvider from "./Context/AuthStore";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
let query =new QueryClient();
root.render(
  <AuthContextProvider>
    <QueryClientProvider client={query}>
      <App />
    </QueryClientProvider>
  </AuthContextProvider>
);
