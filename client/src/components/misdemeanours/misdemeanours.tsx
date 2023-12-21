import { useEffect, useState } from "react";
import { Misdemeanour } from "../../types/misdemeanours.types";
import MisdemeanoursList from "./list";
import MisdemeanoursSelect from "./select";

const Misdemeanours: React.FC = () => {
  const endpoint = "http://localhost:8080/api/misdemeanours/10";
  const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);
  const [filteredMisdemeanours, setFilteredMisdemeanours] =
    useState<Misdemeanour[]>(misdemeanours);
  const [selectedOption, setSeletedOption] = useState<string>("all");

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
    setSeletedOption(selectedMisdemeanour);
  }

  return (
    <>
      <MisdemeanoursSelect
        selectedValue={selectedOption}
        onChangeSelectedValue={(e) => updateFilteredMisdemeanour(e)}
      />
      <MisdemeanoursList misdemeanours={filteredMisdemeanours} />
    </>
  );
};

export default Misdemeanours;
