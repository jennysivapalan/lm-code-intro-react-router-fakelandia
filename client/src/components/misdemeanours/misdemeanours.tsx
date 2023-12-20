import { useEffect, useState } from "react";
import { Misdemeanour, MISDEMEANOURS } from "../../types/misdemeanours.types";
import MisdemeanoursList from "./list";

const Misdemeanours: React.FC = () => {
  const endpoint = "http://localhost:8080/api/misdemeanours/10";
  const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);
  const [filteredMisdemeanours, setFilteredMisdemeanours] =
    useState<Misdemeanour[]>(misdemeanours);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const json = await response.json();

        setMisdemeanours(json.misdemeanours);
        setFilteredMisdemeanours(json.misdemeanours);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  function updateFilteredMisdemeanour(selectedMisdemeanour: string) {
    if (selectedMisdemeanour === "all") setFilteredMisdemeanours(misdemeanours);
    else {
      const filteredList = misdemeanours.filter(
        (m) => m.misdemeanour === selectedMisdemeanour
      );
      setFilteredMisdemeanours(filteredList);
    }
  }

  return (
    <>
      <div>
        <label htmlFor="misdemeanours-list">Filter by Misdemeanor </label>
        <select
          name="misdemeanours-list"
          id="misdemeanours-list"
          onChange={(e) => {
            updateFilteredMisdemeanour(e.target.value);
          }}
        >
          <option value="all">all</option>
          {MISDEMEANOURS.map((m) => (
            <option value={m}>{m}</option>
          ))}
        </select>
      </div>
      <MisdemeanoursList misdemeanours={filteredMisdemeanours} />
    </>
  );
};

export default Misdemeanours;
