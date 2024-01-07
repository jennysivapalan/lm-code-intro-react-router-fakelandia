import { useState, useContext } from "react";
import { Misdemeanour } from "../../types/misdemeanours.types";
import MisdemeanoursList from "./list";
import MisdemeanoursSelect from "./select";

import { MisdemeanoursContext } from "../../App";
import { newMisdemeanours } from "../../service/new-confessions";

const Misdemeanours: React.FC = () => {
  const { isLoading, misdemeanours } = useContext(MisdemeanoursContext);

  const [filteredMisdemeanours, setFilteredMisdemeanours] = useState<
    Misdemeanour[]
  >(misdemeanours.concat(newMisdemeanours));
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
  }

  return (
    <>
      {isLoading && <div>Loading data </div>}
      {!isLoading && (
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
      )}
    </>
  );
};

export default Misdemeanours;
