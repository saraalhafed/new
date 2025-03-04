import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { useState } from "react";
import { IUser } from "./types/context";
const App = () => {
   
    const [userData,setUserData]=useState< IUser| null>(null) // It holds the currently logged-in user's information
  return (
    <Layout>
      <ScrollToTop />
      <AppRoutes />
    </Layout>
  );
};

export default App;
