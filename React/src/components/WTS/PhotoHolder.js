import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { FiCamera } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

const Input = styled.input`
  display: none;
`;

const Icon = styled(FiCamera)`
  font-size: 50px;
  color: ${({ theme }) => theme.white};
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
  font-size: 30px;
  padding: 5px;
  background-color: ${({ theme }) => theme.white};
  position: absolute;
  cursor: pointer;
  display: none;

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
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
      <Container image={selectedFiles[index] !== undefined}>
        <Remove />
        <Photo
          image={
            selectedFiles[index] !== undefined &&
            URL.createObjectURL(selectedFiles[index])
          }
        >
          {selectedFiles[index] === undefined && (
            <>
              <Input
                type="file"
                multiple
                onChange={(e) =>
                  setSelectedFiles([...selectedFiles, ...e.target.files])
                }
              />
              <Icon />
            </>
          )}
        </Photo>
      </Container>
    </Grid>
  );
};

export default PhotoHolder;
