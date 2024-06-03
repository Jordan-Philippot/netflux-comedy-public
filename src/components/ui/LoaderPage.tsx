import styled from "styled-components";
import { COLOR_BLACK_LIGHT, COLOR_PRIMARY_1 } from "utils/colors";

const StyledLoader = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: ${COLOR_BLACK_LIGHT};
`;

const StyledInnerLoader = styled.div`
  transform: translateY(-50%);
  top: 50%;
  position: absolute;
  width: calc(100% - 200px);
  color: ${COLOR_PRIMARY_1};
  padding: 0 100px;
  text-align: center;
`;

const StyledLabelLoader = styled.label`
  font-size: 20px;
  opacity: 0;
  display: inline-block;
  @keyframes mooveToRight {
    0% {
      opacity: 0;
      transform: translateX(-150px);
    }
    33% {
      opacity: 1;
      transform: translateX(0px);
    }
    66% {
      opacity: 1;
      transform: translateX(0px);
    }
    100% {
      opacity: 0;
      transform: translateX(150px);
    }
  }
  &:nth-child(1) {
    animation: mooveToRight 2s 500ms infinite ease-in-out;
  }
  &:nth-child(2) {
    animation: mooveToRight 2s 400ms infinite ease-in-out;
  }
  &:nth-child(3) {
    animation: mooveToRight 2s 300ms infinite ease-in-out;
  }
  &:nth-child(4) {
    animation: mooveToRight 2s 200ms infinite ease-in-out;
  }
  &:nth-child(5) {
    animation: mooveToRight 2s 100ms infinite ease-in-out;
  }
  &:nth-child(6) {
    animation: mooveToRight 2s infinite ease-in-out;
  }
`;

export default function LoaderPage() {
  return (
    <StyledLoader>
      <StyledInnerLoader>
        <StyledLabelLoader>●</StyledLabelLoader>
        <StyledLabelLoader>●</StyledLabelLoader>
        <StyledLabelLoader>●</StyledLabelLoader>
        <StyledLabelLoader>●</StyledLabelLoader>
        <StyledLabelLoader>●</StyledLabelLoader>
        <StyledLabelLoader>●</StyledLabelLoader>
      </StyledInnerLoader>
    </StyledLoader>
  );
}
