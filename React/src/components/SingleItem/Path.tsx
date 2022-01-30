import styled from "styled-components";
import { Link } from "react-router-dom";
import { routes } from "routes";

const Wrapper = styled.div`
  color: ${({ theme }) => theme.darkGrey};
  font-weight: 400;
  display: inline-block;
`;

const List = styled.ol`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const Element = styled.li`
  display: inline-block;

  ::before {
    padding: 0 5px;
    content: "/";
  }

  :first-child::before {
    content: "";
    padding: 0;
  }

  :last-child > a {
    color: ${({ theme }) => theme.blue};
    font-weight: 600;
  }
`;

const Step = styled(Link)`
  color: ${({ theme }) => theme.darkGrey};
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.blue};
  }
`;

const Path = ({
  category,
  brand,
  className,
}: {
  category: string;
  brand: string;
  className: any;
}) => {
  return (
    <Wrapper className={className}>
      <List>
        <Element>
          <Step to={routes.WTB}>All</Step>
        </Element>
        <Element>
          <Step to={routes.CATEGORY_PATH.replace("{category}", category)}>
            {category}
          </Step>
        </Element>
        <Element>
          <Step to={routes.BRAND_PATH.replace("{brand}", brand)}>{brand}</Step>
        </Element>
      </List>
    </Wrapper>
  );
};

export default Path;
