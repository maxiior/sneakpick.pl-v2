import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import logo from "assets/logo.png";
import { routes } from "routes";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { activateNewEmail } from "api/services/users.service";
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
  max-width: 741px;
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

const NewEmailActivation = () => {
  const { uidb64, token }: { uidb64: string; token: string } = useParams();

  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    activateNewEmail(uidb64, token)
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
                Uwaga, coś poszło nie tak! Możliwe, że Twój nowy adres został
                już aktywowany wcześniej lub link, z którego skorzystałeś się
                przedawnił!
              </Text>
            ) : (
              <>
                <Header>Nowy adres e-mail został aktywowany!</Header>
                <Text>
                  Witaj z powrotem! Twój nowy adres e-mail został aktywowany i
                  od tej pory możesz się logować za jego pomocą.
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

export default NewEmailActivation;
