import styled from "styled-components";
import { FiCamera } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StyledInput = styled.input`
  display: none;
`;

const Photo = styled.label`
  padding: 30px;
  width: 90px;
  height: 90px;
  background-color: ${({ theme }) => theme.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;

  background-image: url(${({ image }) => image});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  :hover {
    background-color: ${({ theme }) => theme.blue};
    opacity: ${({ photo }) => photo && "0.9"};
    filter: ${({ image }) => image && "brightness(50%)"};
  }
`;

const Remove = styled(IoTrashOutline)`
  border-radius: 50%;
  font-size: 35px;
  padding: 5px;
  background-color: ${({ theme }) => theme.white};
  position: absolute;
  cursor: pointer;
  display: none;
  z-index: 100;

  :hover + ${Photo} {
    filter: brightness(50%);
  }
`;

const PhotoHolder = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover ${Remove} {
    /* ${({ $isImage }) => $isImage && "display: block"}; */
    display: block;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.font_size_MD};
`;

const Icon = styled(FiCamera)`
  font-size: 30px;
  color: ${({ theme }) => theme.white};
  visibility: ${({ image }) => image && "hidden"};
`;

const Avatar = ({ image, setImage }) => {
  return (
    <Wrapper>
      <Header>Zdjęcie profilowe</Header>
      <PhotoHolder>
        <Remove />
        <Photo
          image={
            image
              ? typeof image === "string"
                ? image
                : URL.createObjectURL(image)
              : null
          }
        >
          <StyledInput
            name="photo"
            type="file"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImage(() => e.target.files[0]);
              }
            }}
          />
          {!image && <Icon />}
        </Photo>
      </PhotoHolder>
    </Wrapper>
  );
};

export default Avatar;
