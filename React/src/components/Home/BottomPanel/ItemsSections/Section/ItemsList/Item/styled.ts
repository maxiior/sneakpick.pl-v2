import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled(Grid)`
  padding: 8px !important;
  :last-child {
    padding-right: 1px !important;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const View = styled.div`
  padding-bottom: 75%;
  box-sizing: border-box;
  resize: horizontal;
  max-width: 100%;
  padding: 10px 10px 0 10px;
  position: relative;
`;

export const State = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.font_size_MD};
  position: absolute;
  background-color: ${({ theme }) => theme.veryDarkGrey};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme._5px};
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
`;

export const Photo = styled.div<{ photo: string }>`
  border: 1px solid ${({ theme }) => theme.lightGrey};
  width: 100%;
  object-fit: cover;
  padding-bottom: 75%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({ photo }) => photo});
`;

export const Informations = styled.div`
  color: ${({ theme }) => theme.veryDarkGrey};
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }

  h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.font_size_MD};
    font-weight: 600;
    color: ${({ theme }) => theme.blue};
  }
`;
