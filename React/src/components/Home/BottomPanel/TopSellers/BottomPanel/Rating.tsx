import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: row-reverse;
`;

const Step = styled.div<{ blank?: boolean }>`
  height: 25px;
  width: 14px;
  background-color: ${({ theme, blank }) => (blank ? theme.grey : theme.blue)};
  margin-left: 1px;

  :last-child {
    margin: 0;
  }
`;

const Rating = ({ rating }: { rating: number }) => {
  const steps = [1, 2, 3, 4, 5];

  return (
    <Wrapper>
      {steps.map((e) => (
        <Step blank={rating === 0 || e < rating} />
      ))}
    </Wrapper>
  );
};

export default Rating;
