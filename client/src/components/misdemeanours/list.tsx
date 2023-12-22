import Item from "./item";
import { Misdemeanour } from "../../types/misdemeanours.types";
import { v4 as uuid } from "uuid";

interface MisdemeanourListProps {
  misdemeanours: Misdemeanour[];
}

const MisdemeanoursList: React.FC<MisdemeanourListProps> = ({
  misdemeanours,
}) => {
  return (
    <>
      <ul className="misdeameanours-list">
        {misdemeanours.map((m) => (
          <Item misdemeanour={m} key={uuid()} />
        ))}
      </ul>
    </>
  );
};

export default MisdemeanoursList;
