import styled from "styled-components";
import NetflixLogo from "assets/netflixLogo.png";

const StyledLogo = styled.img`
  width: 120px;
  height: auto;
`;

export default function LogoImg() {
  return <StyledLogo src={NetflixLogo} alt="Logo Netflix Comedy" />;
}
