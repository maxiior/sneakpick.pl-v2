import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "assets/logo.png";
import { routes } from "routes";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { activation } from "api/services/users.service";
import LoadingIcon from "components/common/LoadingIcon";

const Wrapper = styled.div`
  padding: 70px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.veryDarkGrey};
  margin-bottom: 10px;
`;

const Logo = styled.img`
  width: 242px;
  height: 88px;
`;

const LogoHolder = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Container = styled.div`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 40px;
  min-width: 30%;
`;

const Text = styled.div<{ error?: boolean }>`
  text-align: justify;
  text-justify: inter-word;
  font-size: 14px;

  ${({ error }) =>
    error &&
    css`
      background-color: ${({ theme }) => theme.red};
      padding: 10px;
      color: ${({ theme }) => theme.white};
    `}
`;

const Paragraph = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.blue};
  font-weight: 500;
  padding: 5px 0px;
  font-size: 14px;
`;

const Arrow = styled(BsArrowUpRight)`
  margin-left: 5px;
`;

const LinkHolder = styled.div`
  display: flex;
  align-items: center;
`;

const LoadingIconHolder = styled.div`
  display: flex;
  justify-content: center;
`;

const AccountActivation = () => {
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();

  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    activation(uidb64!, token!)
      .then(() => {
        setPending(false);
      })
      .catch(() => {
        setPending(false);
        setError(true);
      });
  }, []);

  return (
    <Wrapper>
      <Container>
        <LogoHolder>
          <Link to={routes.HOME}>
            <Logo src={logo} />
          </Link>
        </LogoHolder>
        {pending ? (
          <LoadingIconHolder>
            <LoadingIcon />
          </LoadingIconHolder>
        ) : (
          <>
            {error ? (
              <Text error>
                Uwaga, coś poszło nie tak! Możliwe, że Twoje konto zostało już
                aktywowane wcześniej lub link, z którego skorzystałeś się
                przedawnił!
              </Text>
            ) : (
              <>
                <Header>Konto zostało aktywowane!</Header>
                <Text>
                  Cześć, witaj na Sneakpick! Twoje konto zostało aktywowane
                  pomyślnie, możesz już się zalogować!
                </Text>
              </>
            )}

            <Paragraph>Poniżej znajdziesz kilka pomocnych linków:</Paragraph>
            <LinkHolder>
              <StyledLink to={routes.HOME}>
                Strona główna
                <Arrow />
              </StyledLink>
            </LinkHolder>
            <LinkHolder>
              <StyledLink to={routes.WTB + routes.DEFAULT_SEARCH}>
                Itemy
                <Arrow />
              </StyledLink>
            </LinkHolder>
            <LinkHolder>
              <StyledLink to={routes.SUPPORT}>
                Pomoc i kontakt
                <Arrow />
              </StyledLink>
            </LinkHolder>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default AccountActivation;
