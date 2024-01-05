import { useState } from "react";
import { Misdemeanour } from "../../types/misdemeanours.types";
import MisdemeanoursList from "./list";
import MisdemeanoursSelect from "./select";
import { useQuery } from "@tanstack/react-query";
import { misdemeanoursQuery } from "../../main";
import { newMisdemeanours } from "../../service/new-confessions";

const Misdemeanours: React.FC = () => {
  const { data } = useQuery({
    ...misdemeanoursQuery(),

    staleTime: 4000,
    retry: false,
  });
  const misdemeanours: Array<Misdemeanour> =
    data?.concat(newMisdemeanours) ?? [];

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
