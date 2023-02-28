import styled from "styled-components";
import SubDropdown from "components/Nav/Options/Option/Dropdown/DropdownOption/SubDropdown";

const StyledSubDropdown = styled(SubDropdown)`
  display: none;
`;

const Wrapper = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font_size_MD};
  color: ${({ theme }) => theme.veryDarkGrey};
  border-right: 3px solid ${({ theme }) => theme.white};

  :hover {
    color: ${({ theme }) => theme.blue};
    background-color: ${({ theme }) => theme.lightGrey};
    border-right: 3px solid ${({ theme }) => theme.blue};
  }

  :hover ${StyledSubDropdown} {
    display: block;
  }
`;

const DropdownOption = ({ name }: { name: string }) => {
  return (
    <Wrapper>
      <div>{name}</div>
      <StyledSubDropdown />
    </Wrapper>
  );
};

export default DropdownOption;
