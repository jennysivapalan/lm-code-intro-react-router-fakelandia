import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import { useEffect, useState, createContext } from "react";
import { Misdemeanour } from "./types/misdemeanours.types";
import { newMisdemeanours } from "./service/new-confessions";
import { fetchMisdemeanours } from "./service/fetch-misdemeanours";

const MisdemeanoursContext = createContext<{
  misdemeanour: Misdemeanour[];
}>(<Misdemeanour[]>[]); //initialize context with default value

function App() {
  const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await fetchMisdemeanours();
        const allMisdemeanours = json.concat(newMisdemeanours);

        setMisdemeanours(allMisdemeanours);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MisdemeanoursContext.Provider value={{ misdemeanours }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </MisdemeanoursContext.Provider>
    </>
  );
}

export default App;
