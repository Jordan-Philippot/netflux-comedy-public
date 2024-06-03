import styled from "styled-components";
import { COLOR_RED, COLOR_WHITE } from "utils/colors";

const StyledLogoContainer = styled.div`
  font-family: "BebasNeue";
  font-size: 35px;
  color: ${COLOR_RED};
  margin: 0 0 10px 25px;
  padding: 10px 0;

`;

const StyledLogoTitle = styled.p`
  font-size: 32px;
  color: red;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const StyledLogoText = styled.p`
  font-size: 16px;
  color: ${COLOR_WHITE};
  padding: 0;
  margin: 0;
  margin-top:-5px;
  text-align: center;
`;

export default function Logo() {
  return (
    <StyledLogoContainer>
    <StyledLogoTitle>NETFLUX</StyledLogoTitle>
    <StyledLogoText>Comedy</StyledLogoText>
  </StyledLogoContainer>
  )
}
