import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const Block = styled.div`
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: ${({ theme }) => theme.blue};
  animation: icon 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

  :nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  :nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  :nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }

  @keyframes icon {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;

const LoadingIcon = ({ className }: { className?: any }) => {
  return (
    <Wrapper className={className}>
      <Block></Block>
      <Block></Block>
      <Block></Block>
    </Wrapper>
  );
};

export default LoadingIcon;
