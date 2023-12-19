import { useEffect, useState, createContext } from "react";
import { Misdemeanour } from "../../types/misdemeanours.types";
import MisdemeanoursList from "./list";

export const MisdemeanoursContext = createContext<Misdemeanour[]>([]);

const Misdemeanours: React.FC = () => {
  const endpoint = "http://localhost:8080/api/misdemeanours/10";
  const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const json = await response.json();

        setMisdemeanours(json.misdemeanours);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MisdemeanoursContext.Provider value={misdemeanours}>
      <MisdemeanoursList />
    </MisdemeanoursContext.Provider>
  );
};

export default Misdemeanours;
