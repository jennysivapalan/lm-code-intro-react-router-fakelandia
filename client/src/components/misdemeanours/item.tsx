import { Misdemeanour, EMOJIS } from "../../types/misdemeanours.types";

interface MisdemeanourProps {
  misdemeanour: Misdemeanour;
  imageId: string;
}
const Item: React.FC<MisdemeanourProps> = ({ misdemeanour, imageId }) => {
  const imageUrl = `https://picsum.photos/id/${imageId}/200/200`;
  const emoji = EMOJIS.find(
    (e) => e.misdemeanour === misdemeanour.misdemeanour
  )?.emoji;
  return (
    <>
      <div className="table-row">
        <div className="row-item row-item__first">{misdemeanour.citizenId}</div>
        <div className="row-item">{misdemeanour.date}</div>
        <div className="row-item">
          {misdemeanour.misdemeanour} {emoji}
        </div>
        <div className="row-item">
          <img src={imageUrl} data-testid={`mis-image-${imageId}`} />
        </div>
      </div>
    </>
  );
};

export default Item;
