import { Wrapper } from "./styles";

const Avatar = ({
  editable,
  photo,
  rating,
}: {
  editable?: boolean;
  photo: string;
  rating: number;
}) => {
  return <Wrapper editable={editable} photo={photo} ratio={rating / 5} />;
};

export default Avatar;
