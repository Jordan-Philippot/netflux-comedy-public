import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR_GREY, COLOR_GREY_DARK } from "utils/colors";

// ----------
// Components
// ----------
import Text from "components/ui/Text";
import Github from "components/icon/Github";
import LinkedIn from "components/icon/LinkedIn";
import Mail from "components/icon/Mail";
import Phone from "components/icon/Phone";
import Tooltip from "components/ui/Tooltip";

const StyledFooterContainer = styled.footer`
  position: relative;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px 0;
  width: fit-content;
  margin: 40px auto;
`;
const StyledHr = styled.hr`
  color: ${COLOR_GREY_DARK};
  width: 100%;
`;
const StyledSocialMediaContainer = styled.div`
  display: flex;
  gap: 0 30px;
`;
const StyledCguContainer = styled.div`
  display: flex;
  gap: 10px 30px;
  color: ${COLOR_GREY};
  font-size: 12px;
  flex-wrap: wrap;

  a {
    word-wrap: no-wrap;
  }
`;

export default function Footer() {
  return (
    <StyledFooterContainer>
      <StyledHr />
      <StyledSocialMediaContainer>
        <Link to={process.env.REACT_APP_GITHUB_LINK as string} target="_blank" title="Profil Github">
          <Github />
        </Link>
        <Link
          to={process.env.REACT_APP_LINKEDIN_LINK as string}
          target="_blank"
          title="Profil Linkedin"
        >
          <LinkedIn />
        </Link>
        <Tooltip label={<Phone />} position="top" isClickable>
          07 81 19 74 38
        </Tooltip>
        <Tooltip label={<Mail />} position="top" isClickable>
          jordan.philippot.pro@gmail.com
        </Tooltip>
      </StyledSocialMediaContainer>

      <StyledCguContainer>
        <Link to="#">Nous contacter</Link> <Link to="#">Mentions Légales</Link>{" "}
        <Link to="#">Conditions d'utilisation </Link>
        <Link to="#">Information légales </Link>
        <Link to="#">Centre d'aide </Link>
      </StyledCguContainer>

      <Text size="s">
        &copy; 2024 Netflix, Jordan Philippot - Développeur Fullstack
      </Text>
    </StyledFooterContainer>
  );
}
