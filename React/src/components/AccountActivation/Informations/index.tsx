import { Text, Header, Paragraph, Holder, StyledLink, Arrow } from "./styles";
import { routes } from "routes";

const Informations = ({ error }: { error: boolean }) => {
  return (
    <>
      {error ? (
        <Text $error={error}>
          Uwaga, coś poszło nie tak! Możliwe, że Twoje konto zostało już
          aktywowane wcześniej lub link, z którego skorzystałeś się przedawnił!
        </Text>
      ) : (
        <>
          <Header>Konto zostało aktywowane!</Header>
          <Text>
            Cześć, witaj na Sneakpick! Twoje konto zostało aktywowane pomyślnie,
            możesz już się zalogować!
          </Text>
        </>
      )}

      <Paragraph>Poniżej znajdziesz kilka pomocnych linków:</Paragraph>
      <Holder>
        <StyledLink to={routes.HOME}>
          Strona główna
          <Arrow />
        </StyledLink>
      </Holder>
      <Holder>
        <StyledLink to={routes.WTB + routes.DEFAULT_SEARCH}>
          Itemy
          <Arrow />
        </StyledLink>
      </Holder>
      <Holder>
        <StyledLink to={routes.SUPPORT}>
          Pomoc i kontakt
          <Arrow />
        </StyledLink>
      </Holder>
    </>
  );
};

export default Informations;
