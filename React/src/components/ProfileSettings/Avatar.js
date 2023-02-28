import styled from "styled-components";
import { FiCamera } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Remove = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.white};
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.red};
  margin-right: 20px;

  :hover {
    opacity: 0.9;
  }
`;

const StyledInput = styled.input`
  display: none;
`;

const EditIcon = styled(FiEdit)`
  font-size: 35px;
  position: absolute;
  display: none;
  z-index: 100;
  color: ${({ theme }) => theme.white};
  pointer-events: none;
`;

const Photo = styled.label`
  padding: 30px;
  width: 100px;
  height: 100px;
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
    filter: ${({ image }) => image && "brightness(50%)"};
  }

  :hover + ${EditIcon} {
    display: block;
  }
`;

const PhotoHolder = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Holder = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = ({ image, setImage }) => {
  return (
    <Wrapper>
      <Header>Zdjęcie profilowe</Header>
      <Holder>
        <div>
          {image && <Remove onClick={() => setImage(null)}>Usuń</Remove>}
        </div>
        <PhotoHolder>
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
          {image && <EditIcon />}
        </PhotoHolder>
      </Holder>
    </Wrapper>
  );
};

export default Avatar;
