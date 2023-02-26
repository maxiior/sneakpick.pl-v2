import styled from "styled-components";

export const Wrapper = styled.div<{
  editable?: boolean;
  photo?: string;
  ratio: number;
}>`
  --ratio: ${({ ratio }) => ratio};
  height: 90px;
  width: 90px;
  border-radius: 50%;
  position: relative;
  clip-path: circle(43%);
  cursor: ${({ editable }) => editable && "pointer"};

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: ${({ theme }) =>
      `conic-gradient(${theme.blue} 0 calc(var(--ratio) * 360deg), ${theme.veryDarkGrey} calc(var(--ratio) * 360deg) 360deg);`};
    z-index: -2;
  }

  ::after {
    content: "";
    position: absolute;
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    background-image: url(${({ photo }) => photo});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    z-index: -1;
  }
`;
