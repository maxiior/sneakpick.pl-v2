import styled from "styled-components";
import Communicator from "components/Communicator";
import {
  hideCommunicatorIcon,
  openCommunicator,
} from "store/interface/actions";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const MessageIcon = styled.div`
  position: fixed;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
  z-index: 2000;
  right: 30px;
  bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Notification = styled.div`
  position: absolute;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
  top: 0;
  left: 0;
`;

const CommunicatorTemplate = ({ children }) => {
  const dispatch = useDispatch();
  const { communicatorIcon } = useSelector((state) => state.interfaceSlice);
  const { isAuthenticated } = useSelector((state) => state.authSlice);
  const communicatorBar = useSelector(
    (state) => state.interfaceSlice.communicatorBar
  );

  return (
    <Wrapper>
      {isAuthenticated && (
        <>
          {communicatorIcon && (
            <MessageIcon
              onClick={() => {
                dispatch(hideCommunicatorIcon());
                dispatch(openCommunicator());
              }}
            >
              <div>DM</div>
              <Notification>2</Notification>
            </MessageIcon>
          )}
          {communicatorBar && <Communicator />}
        </>
      )}
      {children}
    </Wrapper>
  );
};

export default CommunicatorTemplate;
