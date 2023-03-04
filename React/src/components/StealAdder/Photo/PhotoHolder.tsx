import styled from "styled-components";
import { FiCamera } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { iPhoto } from "./types/photo";
import { ChangeEvent } from "react";
import { useRef } from "react";

const Input = styled.input`
  display: none;
`;

const Icon = styled(FiCamera)<{ $isImage: boolean }>`
  font-size: 50px;
  color: ${({ theme }) => theme.white};
  visibility: ${({ $isImage }) => $isImage && "hidden"};

  @media only screen and (max-width: ${({ theme }) => theme.max_width_XL}) {
    font-size: 4vw;
  }
  @media only screen and (max-width: ${({ theme }) => theme.max_width_MD}) {
    font-size: 5vw;
  }
`;

const Photo = styled.label<{ image: any }>`
  background-color: ${({ theme }) => theme.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  width: 100%;

  background-image: url(${({ image }) => image});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  :hover {
    background-color: ${({ theme }) => theme.blue};
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

const Wrapper = styled.div<{ $isImage: boolean }>`
  height: 200px;
  width: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover ${Remove} {
    ${({ $isImage }) => $isImage && "display: block"};
  }
`;

const PhotoHolder = ({ image, setImageError, setImage }: iPhoto) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      alert("Nie dodałeś plików!");
      return;
    }
    setImageError("");
    setImage(e.target.files[0]);
  };

  return (
    <Wrapper $isImage={image.size !== 0}>
      <Remove
        onClick={() => {
          setImage(new File([], ""));
          setImageError("");
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
      <Photo image={image.size !== 0 ? URL.createObjectURL(image) : undefined}>
        <Input
          name="photo"
          type="file"
          onChange={(e) => handleFile(e)}
          ref={inputRef}
        />
        <Icon $isImage={image.size !== 0} />
      </Photo>
    </Wrapper>
  );
};

export default PhotoHolder;
