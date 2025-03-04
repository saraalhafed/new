import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ToastContainer } from "react-toastify";
import { CountryProvider } from "./context/CountryContext.tsx";
import { PackListProvider } from "./context/PackListContext.tsx";
import { ProfileProvider } from "./context/ProfileContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CountryProvider>
       <PackListProvider>
         <AuthProvider>
          <ProfileProvider>
           <App />
          </ProfileProvider>
         </AuthProvider>
      </PackListProvider>
    </CountryProvider>
    <ToastContainer />
  </BrowserRouter>
);
