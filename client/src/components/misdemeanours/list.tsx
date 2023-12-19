import { useContext } from "react";
import { MisdemeanoursContext } from "./misdemeanours";

const MisdemeanoursList: React.FC = () => {
  const misdemeanours = useContext(MisdemeanoursContext);
  return (
    <ul>
      {misdemeanours.map((m) => (
        <div>{m.citizenId}</div>
      ))}
    </ul>
  );
};

export default MisdemeanoursList;
