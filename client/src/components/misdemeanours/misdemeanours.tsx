import { useEffect, useState, useContext } from "react";
import { Misdemeanour } from "../../types/misdemeanours.types";
import MisdemeanoursList from "./list";
import MisdemeanoursSelect from "./select";
import { newMisdemeanours } from "../../service/new-confessions";
import { fetchMisdemeanours } from "../../service/fetch-misdemeanours";

import MisdemeanoursContext from "../../App";

const Misdemeanours: React.FC = () => {
  const x: Misdemeanour[] = useContext(MisdemeanoursContext);

  const [filteredMisdemeanours, setFilteredMisdemeanours] =
    useState<Misdemeanour[]>(misdemeanours);
  const [selectedOption, setSeletedOption] = useState<string>("all");
  const [errorMsg, setErrorMsg] = useState<string>("");

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
