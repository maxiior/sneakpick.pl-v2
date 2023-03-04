import { useRef } from "react";
import styled from "styled-components";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useDetectOutsideClick } from "hooks/useDetectOutsideClick";
import { closeConditionalPopup } from "store/interface/actions";
import { setInformationBlock } from "store/interface/actions";

const Wrapper = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-height: 435px) {
    padding: 30px 0;
    align-items: unset;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: relative;
  padding: 35px;

  @media only screen and (max-width: ${({ theme }) => theme.max_width_SM}) {
    width: 80%;
  }
`;

const Header = styled.div`
  margin-bottom: 25px;
  text-align: center;
`;

const Button = styled.div`
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.font_size_MD};
  cursor: pointer;
  user-select: none;
  width: 100%;
  text-align: center;
  margin-right: 10px;

  :last-child {
    margin-right: 0px;
  }
  :hover {
    filter: opacity(90%);
  }
`;

const Holder = styled.div`
  display: flex;
`;

const ConditionalPopup = ({
  header,
  onAgree,
  afterAgree,
  informationAfterAgree,
}: {
  header: string;
  onAgree: any;
  afterAgree: any;
  informationAfterAgree: string;
}) => {
  const dispatch = useAppDispatch();
  const wrapperRef = useRef(null);
  useDetectOutsideClick(wrapperRef, () => {
    dispatch(closeConditionalPopup());
  });

  return (
    <Wrapper>
      <Container ref={wrapperRef}>
        <Header>{header}</Header>
        <Holder>
          <Button
            onClick={() => {
              onAgree().then(() => {
                dispatch(afterAgree());
              });
              dispatch(closeConditionalPopup());
              dispatch(setInformationBlock(informationAfterAgree));
            }}
          >
            Tak
          </Button>
          <Button onClick={() => dispatch(closeConditionalPopup())}>Nie</Button>
        </Holder>
      </Container>
    </Wrapper>
  );
};

export default ConditionalPopup;
