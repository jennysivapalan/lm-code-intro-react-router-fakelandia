import { useContext } from "react";
import { MisdemeanoursContext } from "./misdemeanours";
import Item from "./item";

const MisdemeanoursList: React.FC = () => {
  const misdemeanours = useContext(MisdemeanoursContext);
  return (
    <ul>
      {misdemeanours.map((m) => (
        <Item misdemeanour={m} />
      ))}
    </ul>
  );
};

export default MisdemeanoursList;
