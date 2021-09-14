import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Items from "components/Profile/Items";
import { fetchItems as fetchItemsAction } from "actions/profile";
import { connect } from "react-redux";
import TopPanel from "components/Profile/TopPanel";

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

const Profile = ({ fetchItems, results }) => {
  const { user } = useParams();

  useEffect(() => {
    fetchItems(user);
  }, []);

  return (
    <Wrapper>
      <Container>
        <TopPanel />
        <BottomPanel>
          <Label>Moje itemy</Label>
          <NumberOfItems>
            {results} {results === 1 ? "przedmiot" : "przedmioty"}
          </NumberOfItems>
          <Items />
        </BottomPanel>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = ({ profileReducer }) => {
  return {
    results: profileReducer.results,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchItems: (user) => dispatch(fetchItemsAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
