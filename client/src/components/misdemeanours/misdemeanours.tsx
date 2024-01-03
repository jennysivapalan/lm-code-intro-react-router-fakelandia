import { useEffect, useState } from "react";
import { Misdemeanour } from "../../types/misdemeanours.types";
import MisdemeanoursList from "./list";
import MisdemeanoursSelect from "./select";
import { newMisdemeanours } from "../../service/new-confessions";
import { fetchMisdemeanours } from "../../service/fetch-misdemeanours";

const Misdemeanours: React.FC = () => {
  const [misdemeanours, setMisdemeanours] = useState<Misdemeanour[]>([]);
  const [filteredMisdemeanours, setFilteredMisdemeanours] =
    useState<Misdemeanour[]>(misdemeanours);
  const [selectedOption, setSeletedOption] = useState<string>("all");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await fetchMisdemeanours();
        const allMisdemeanours = json.concat(newMisdemeanours);

        setMisdemeanours(allMisdemeanours);
        setFilteredMisdemeanours(allMisdemeanours);
      } catch (error) {
        console.error("Error", error);
        setErrorMsg(
          "Sorry an error occurred fetching misdemeanours. Try again later."
        );
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
      <div className="errorMsg">{errorMsg}</div>
      <div className="table-container">
        <MisdemeanoursSelect
          selectedValue={selectedOption}
          onChangeSelectedValue={(e) => updateFilteredMisdemeanour(e)}
        />
        <MisdemeanoursList misdemeanours={filteredMisdemeanours} />
      </div>
    </>
  );
};

export default Misdemeanours;
