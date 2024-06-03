import { COLOR_TEXT_DARK } from "utils/colors";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "hooks/useAuth";
import { device } from "utils/breakpoints";

// ----------
// Component
// ----------
import NavItem from "components/ui/NavItem";
import Text from "components/ui/Text";
import Arrow from "components/icon/Arrow";
// import Notification from "components/icon/Notification";
import Tooltip from "components/ui/Tooltip";
import Button from "components/ui/Button";
import SearchInput from "components/ui/SearchInput";
import Logo from "components/app/Logo";

// ----------
// Assets
// ----------
import Avatar from "assets/avatar.png";

const StyledNav = styled.nav`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: start;
  padding: 10px 0;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 0px 20px;

  @media ${device.laptop} {
    padding: 0 40px;
  }
  @media ${device.laptopL} {
    padding: 0 60px;
  }
`;

const StyledLinkNav = styled.div`
  margin: auto 25px;
  display: flex;
`;
const StyledRightNav = styled.div`
  margin-left: auto;
  display: flex;
  color: white;
  width: auto;
`;

export const StyledAvatarContainer = styled.div`
  display: flex;
  margin: auto;
  :hover {
    cursor: pointer;
  }
`;

export const StyledAvatarImg = styled.img`
  width: 36px;
  height: 36px;
  margin-left: 25px;
`;

export default function NavDesktop() {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <StyledNav>
      <Link to="/">
        <Logo/>
      </Link>

      <StyledLinkNav>
        {/* {user && (
          <NavItem labelKey="Recommandations" path="/user/recommended" />
        )} */}

        {/* <NavItem labelKey="Jeunesse" path="/videos/youth" /> */}
        {user && <NavItem labelKey="Abonnements" path="/user/subscriptions" />}
      </StyledLinkNav>

      <StyledRightNav>
        {location.pathname === "/" && <SearchInput />}
        {user ? (
          <>
            {/* <NavItem labelKey={<Notification />} path="notifications" /> */}
            <NavItem labelKey="Ma liste" path="user/list" />

            <Tooltip
              isClickable
              label={
                <StyledAvatarContainer>
                  <StyledAvatarImg src={Avatar} alt="avatar logged" />
                  <Arrow rotation={"bottom"} />
                </StyledAvatarContainer>
              }
              position="bottom"
            >
              <Text
                color="secondary"
                size="l"
                weight="800"
                style={{ marginBottom: "10px" }}
              >
                {user?.firstname}
              </Text>
              <Link
                to="user/profile"
                style={{ color: COLOR_TEXT_DARK, fontSize: "14px" }}
              >
                Mon profil
              </Link>
              <Text color="dark" onClick={() => logout()}>
                Se déconnecter
              </Text>
            </Tooltip>
          </>
        ) : (
          <Button
            label="S'identifier"
            link={"/login"}
            color="red"
            name={"name"}
            style={{ fontSize: "16px", marginLeft: "20px" }}
          />
        )}
      </StyledRightNav>
    </StyledNav>
  );
}
