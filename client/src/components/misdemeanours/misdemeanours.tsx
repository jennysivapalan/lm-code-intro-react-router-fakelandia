import { useState, useContext } from "react";
import { Misdemeanour } from "../../types/misdemeanours.types";
import MisdemeanoursList from "./list";
import MisdemeanoursSelect from "./select";

import { MisdemeanoursContext } from "../../App";
import { newMisdemeanours } from "../../service/new-confessions";

function filterMisdemeanours(
  selectedMisdemeanour: string,
  misdemeanours: Misdemeanour[]
) {
  if (selectedMisdemeanour === "all") return misdemeanours;
  else {
    return misdemeanours.filter((m) => m.misdemeanour === selectedMisdemeanour);
  }
}

const Misdemeanours: React.FC = () => {
  const { isLoading, misdemeanours } = useContext(MisdemeanoursContext);
  const [selectedOption, setSeletedOption] = useState<string>("all");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const filteredMisdemeanours = filterMisdemeanours(
    selectedOption,
    misdemeanours.concat(newMisdemeanours)
  );
  return (
    <>
      {isLoading && <div>Loading data </div>}
      {!isLoading && (
        <>
          <div className="errorMsg">{errorMsg}</div>
          <div className="table-container">
            <MisdemeanoursSelect
              selectedValue={selectedOption}
              onChangeSelectedValue={(value) => setSeletedOption(value)}
            />
            <MisdemeanoursList misdemeanours={filteredMisdemeanours} />
          </div>
        </>
      )}
    </>
  );
};

export default Misdemeanours;
