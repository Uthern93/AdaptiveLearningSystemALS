import React from "react";
import styled from 'styled-components';

const SectionContainer = styled.div`
  background: linear-gradient(to top, #5D93C8, #c69361);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-sizing: border-box;
  padding: 20px;
`;

const StyledHeading = styled.h1`
  text-align: center;
  width: 50%;

  
  @media (max-width: 768px) {
    width: 80%;
    font-size: 24px;
    border: 2px  solid black;

  }
`;

const StyledParagraph = styled.p`
  text-align: center;
  width: 50%;
  
  @media (max-width: 768px) {
    width: 100%;
    font-size: 18px;
    border: 2px  solid black;

  }
`;

function Section2() {
  return (
    <SectionContainer id="section2">
      <StyledHeading>About ALS</StyledHeading>
      <StyledParagraph>
        Welcome to ALS (Adaptive LEarning System) where innovation meets adaptation seamlessly.
        ALS, harnesses the power of artificial intelligence to
        revolutionize your experience. With cutting-edge AI technology ALS
        doesn't just react; it learns, evolves, and adapts through intricate
        patterns in your usage, ensuring that every interaction feels
        tailor-made for you. Whether you're exploring our diverse range of
        features or delving into our immersive content, our platform is designed
        to understand your needs and preferences, providing a personalized
        journey like no other.
      </StyledParagraph>
    </SectionContainer>
  );
}

export default Section2;
