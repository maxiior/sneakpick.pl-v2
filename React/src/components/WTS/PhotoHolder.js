import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { FiCamera } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { Error } from "components/WTS/Error";

const Input = styled.input`
  display: none;
`;

const Icon = styled(FiCamera)`
  font-size: 50px;
  color: ${({ theme }) => theme.white};
  visibility: ${({ image }) => image && "hidden"};
`;

const Photo = styled.label`
  padding-top: 20%;
  padding-bottom: 20%;
  background-color: ${({ theme }) => theme.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
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

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover ${Remove} {
    ${({ image }) => image && "display: block"};
  }
`;

const PhotoHolder = ({ index, selectedFiles, setSelectedFiles }) => {
  const { register, formState } = useFormContext();
  const validator = register("photo");

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
      {formState.errors.photo && (
        <Error>{formState.errors.photo.message}</Error>
      )}
      <Container image={selectedFiles[index] !== undefined}>
        <Remove
          onClick={() =>
            setSelectedFiles(selectedFiles.filter((e, i) => i !== index && e))
          }
        />
        <Photo
          image={
            selectedFiles[index] !== undefined &&
            URL.createObjectURL(selectedFiles[index])
          }
        >
          {/* {selectedFiles[index] === undefined && ( */}
          <Input
            name="photo"
            type="file"
            multiple
            onChange={(e) => {
              validator.onChange(e);
              setSelectedFiles([...selectedFiles, ...e.target.files]);
            }}
          />
          {/* )} */}
          <Icon image={selectedFiles[index] !== undefined} />
        </Photo>
      </Container>
    </Grid>
  );
};

export default PhotoHolder;
