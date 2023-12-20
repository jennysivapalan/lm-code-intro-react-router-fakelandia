import Item from "./item";
import { Misdemeanour } from "../../types/misdemeanours.types";

interface MisdemeanourListProps {
  misdemeanours: Misdemeanour[];
}

const MisdemeanoursList: React.FC<MisdemeanourListProps> = ({
  misdemeanours,
}) => {
  return (
    <>
      <ul>
        {misdemeanours.map((m) => (
          <Item misdemeanour={m} />
        ))}
      </ul>
    </>
  );
};

export default MisdemeanoursList;
