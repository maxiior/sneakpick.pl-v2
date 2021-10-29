import React from "react";
import styled from "styled-components";
import Contact from "components/Support/Contact";
import NotLoggedInformation from "components/Support/NotLoggedInformation";
import TopPanel from "components/Support/TopPanel";
import { useAppSelector } from "hooks/useAppSelector";
import { Link } from "react-router-dom";
import { routes } from "routes";

const Wrapper = styled.div`
  width: 100%;
  user-select: none;
`;

const BottomPanel = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
`;

const Container = styled.div`
  width: 80%;
`;

const Faq = styled.div`
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.blue};
  font-weight: 500;
  text-decoration: none;
  margin-left: 5px;
`;

const Support: React.FC = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authSlice.isAuthenticated
  );

  return (
    <Wrapper>
      <TopPanel />
      <BottomPanel>
        <Container>
          <Faq>
            Odpowiedzi na najczęściej zadawane pytania znajdziesz tutaj:
            <StyledLink to={routes.FAQ}>FAQ</StyledLink>
          </Faq>
          {!isAuthenticated && <NotLoggedInformation />}
          {isAuthenticated && <Contact />}
        </Container>
      </BottomPanel>
    </Wrapper>
  );
};

export default Support;
