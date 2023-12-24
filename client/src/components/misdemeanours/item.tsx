import { Misdemeanour } from "../../types/misdemeanours.types";

interface MisdemeanourProps {
  misdemeanour: Misdemeanour;
  imageId: string;
}
const Item: React.FC<MisdemeanourProps> = ({ misdemeanour, imageId }) => {
  const imageUrl = `https://picsum.photos/id/${imageId}/200/200`;
  return (
    <>
      <div className="misdeameanour-item">
        {misdemeanour.citizenId}, {misdemeanour.date},{" "}
        {misdemeanour.misdemeanour}
      </div>
      <div>
        <img src={imageUrl} />
      </div>
    </>
  );
};

export default Item;
