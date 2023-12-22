import { Misdemeanour } from "../../types/misdemeanours.types";

interface MisdemeanourProps {
  misdemeanour: Misdemeanour;
}
const Item: React.FC<MisdemeanourProps> = ({ misdemeanour }) => {
  return (
    <div className="misdeameanour-item">
      {misdemeanour.citizenId}, {misdemeanour.date}, {misdemeanour.misdemeanour}
    </div>
  );
};

export default Item;
