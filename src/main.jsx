import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";

import "aos/dist/aos.css";
import AOS from "aos";
import AuthProvider from "./Context/AuthContext/AuthProvider.jsx";

function AOSInitializer({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-urbanist max-w-11/12 xl:max-w-10/12 2xl:max-w-9/12 mx-auto">
      <AOSInitializer>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AOSInitializer>
    </div>
  </StrictMode>
);
