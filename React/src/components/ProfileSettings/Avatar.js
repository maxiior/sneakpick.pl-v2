import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { FiCamera } from "react-icons/fi";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StyledInput = styled.input`
  display: none;
`;

const PhotoHolder = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

  background-image: url(${({ photo }) => photo});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  :hover {
    background-color: ${({ theme }) => theme.blue};
    opacity: ${({ photo }) => photo && "0.9"};
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

const Avatar = ({ photo, className }) => {
  const { register, formState } = useFormContext();
  const validator = register("photo");

  return (
    <Wrapper className={className}>
      <Header>Zdjęcie profilowe</Header>
      <PhotoHolder>
        <Photo photo={photo}>
          <StyledInput
            name="photo"
            type="file"
            onChange={(e) => {
              validator.onChange(e);
            }}
          />
          <Icon />
        </Photo>
      </PhotoHolder>
    </Wrapper>
  );
};

export default Avatar;
