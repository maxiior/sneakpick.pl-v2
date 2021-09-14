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

const Error = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.red};
  margin-top: ${({ statute }) => (statute ? "-10px" : "3px")};
  margin-bottom: ${({ statute }) => (statute ? "15px" : "0")};
  width: 250px;
  font-weight: 500;
  position: absolute;
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
    opacity: ${({ image }) => image && "0.9"};
  }
`;

const Header = styled.div``;

const Icon = styled(FiCamera)`
  font-size: 30px;
  color: ${({ theme }) => theme.white};
  visibility: ${({ image }) => image && "hidden"};
`;

const Avatar = ({ value, name, placeholder, className }) => {
  const { register, formState } = useFormContext();
  const validator = register("photo");

  return (
    <Wrapper className={className}>
      <Header>Zdjęcie profilowe</Header>
      <PhotoHolder>
        <Photo image>
          <StyledInput
            name="photo"
            type="file"
            multiple
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
