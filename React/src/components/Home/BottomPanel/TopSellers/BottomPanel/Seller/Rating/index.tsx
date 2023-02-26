import { Wrapper, Step } from "./styles";

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
