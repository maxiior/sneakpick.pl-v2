import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Items from "components/Profile/Items";
import { fetchItems } from "store/profile/actions";
import TopPanel from "components/Profile/TopPanel";
import { useDispatch, useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 80%;
`;

const BottomPanel = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.grey};
`;

const NumberOfItems = styled.div`
  font-size: 20px;
  user-select: none;
`;

const Label = styled.div`
  background-color: ${({ theme }) => theme.veryDarkGrey};
  color: ${({ theme }) => theme.white};
  padding: 10px 30px;
  font-size: 20px;
  width: 250px;
  text-align: center;
  margin-top: -1px;
  margin-bottom: 20px;
  user-select: none;
`;

const Profile = () => {
  const { user } = useParams();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.profileSlice);

  useEffect(() => {
    dispatch(fetchItems(user));
  }, []);

  return (
    <Wrapper>
      <Container>
        <TopPanel />
        <BottomPanel>
          <Label>Moje itemy</Label>
          <NumberOfItems>
            {selector.results}{" "}
            {selector.results === 1 ? "przedmiot" : "przedmioty"}
          </NumberOfItems>
          <Items />
        </BottomPanel>
      </Container>
    </Wrapper>
  );
};

export default Profile;
