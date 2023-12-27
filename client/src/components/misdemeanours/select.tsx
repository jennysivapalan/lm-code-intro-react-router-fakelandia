import { MISDEMEANOURS } from "../../types/misdemeanours.types";
import { v4 as uuid } from "uuid";

interface SelectProps {
  selectedValue: string;
  onChangeSelectedValue: (value: string) => void;
}

const MisdemeanoursSelect: React.FC<SelectProps> = ({
  selectedValue,
  onChangeSelectedValue,
}) => {
  return (
    <div className="table-select">
      <label htmlFor="misdemeanours-select"> </label>
      <select
        name="misdemeanours-select"
        id="misdemeanours-select"
        onChange={(e) => {
          onChangeSelectedValue(e.target.value);
        }}
        value={selectedValue}
      >
        <option value="all">Filter</option>
        <option value="all">all</option>
        {MISDEMEANOURS.map((m) => (
          <option key={uuid()} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MisdemeanoursSelect;
