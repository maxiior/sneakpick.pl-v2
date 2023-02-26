import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

export const Wrapper = styled(Grid)`
  padding: 8px !important;
  :last-child {
    padding-right: 1px !important;
  }
`;

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  width: 100%;
  height: 100%;
  position: relative;
`;

export const View = styled.div`
  padding-bottom: 75%;
  max-width: 100%;
  padding: 10px 10px 0 10px;
  position: relative;
`;

export const PhotoPlaceHolder = styled.div`
  background-color: ${({ theme }) => theme.lightGrey};
  padding-bottom: 75%;
  width: 100%;
  animation: loading 1s linear infinite alternate;

  @keyframes loading {
    0% {
      background-color: ${({ theme }) => theme.lightGrey};
    }
    100% {
      background-color: ${({ theme }) => theme.grey};
    }
  }
`;

export const Informations = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Holder = styled.div`
  width: 100%;
`;

export const Lane = styled.div`
  width: 100%;
  height: 15px;
  background-color: ${({ theme }) => theme.lightGrey};

  :last-child {
    margin-top: 10px;
  }

  animation: loading 1s linear infinite alternate;

  @keyframes loading {
    0% {
      background-color: ${({ theme }) => theme.lightGrey};
    }
    100% {
      background-color: ${({ theme }) => theme.grey};
    }
  }
`;
