import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import { useEffect, useState, createContext } from "react";
import { fetchMisdemeanours } from "./service/fetch-misdemeanours";
import { MisdemeanourFetchData } from "./service/fetch-misdemeanours";

const initialData: MisdemeanourFetchData = {
  isLoading: true,
  misdemeanours: [],
};

export const MisdemeanoursContext =
  createContext<MisdemeanourFetchData>(initialData);

function App() {
  const [misdemeanourFetchData, setMisdemeanourFetchData] =
    useState<MisdemeanourFetchData>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const misdemeanourFetchData = await fetchMisdemeanours();

        setMisdemeanourFetchData({
          isLoading: misdemeanourFetchData.isLoading,
          misdemeanours: misdemeanourFetchData.misdemeanours,
        });
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MisdemeanoursContext.Provider value={misdemeanourFetchData}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </MisdemeanoursContext.Provider>
    </>
  );
}

export default App;
