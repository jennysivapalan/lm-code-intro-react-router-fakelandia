import Item from "./item";
import { Misdemeanour } from "../../types/misdemeanours.types";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";

interface MisdemeanourListProps {
  misdemeanours: Misdemeanour[];
}

const MisdemeanoursList: React.FC<MisdemeanourListProps> = ({
  misdemeanours,
}) => {
  const endpoint = `https://picsum.photos/v2/list?limit=${misdemeanours.length}`;
  const [imageIds, setImageIds] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const json = await response.json();
        const ids = json.map((j) => j.id);

        setImageIds(ids);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <ul className="misdeameanours-list">
        {misdemeanours.map((m, i) => (
          <Item misdemeanour={m} key={uuid()} imageId={imageIds[i]} />
        ))}
      </ul>
    </>
  );
};

export default MisdemeanoursList;
