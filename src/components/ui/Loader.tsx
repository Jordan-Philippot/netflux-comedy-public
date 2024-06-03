import styled from "styled-components";
import { COLOR_BLUE } from "utils/colors";

const StyledLoaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: auto;
  min-height: 300px;
`;

const StyledLoader = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid ${COLOR_BLUE};
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin: auto;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`;

export default function LoaderPage() {
  return (
    <StyledLoaderContainer>
      <StyledLoader />
    </StyledLoaderContainer>
  );
}
