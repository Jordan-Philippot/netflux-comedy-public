import { useAuth } from "hooks/useAuth";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { COLOR_RED, COLOR_WHITE } from "utils/colors";

// ----------
// Component
// ----------
import NavItem from "components/ui/NavItem";
import Text from "components/ui/Text";
// import Notification from "components/icon/Notification";
import Button from "components/ui/Button";
import SearchInput from "components/ui/SearchInput";
import Logo from "components/app/Logo";

const StyledContainer = styled.div`
  background-color: rgb(0, 0, 0);
  width: 100vw;
  position: relative;
  z-index: 10;
`;

const StyledBurgerContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 25px;
  z-index: 10;
  height: 40px;
`;

const StyledBar = styled.div<{ open: boolean }>`
  width: 25px;
  height: 2px;
  background-color: ${COLOR_WHITE};
  margin: 6px 0;
  transition: 0.4s;
  box-shadow: 0px 0px 10px ${COLOR_RED};
  &:first-child {
    transform: ${(props) =>
      props.open ? "rotate(-45deg) translate(-5px, 6px)" : ""};
  }

  &:nth-child(2) {
    opacity: ${(props) => (props.open ? "0" : "1")};
  }

  &:last-child {
    transform: ${(props) =>
      props.open ? "rotate(45deg) translate(-5px, -6px)" : ""};
  }
`;

const NavContainer = styled.nav<{ open: boolean }>`
  position: relative;
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  transition: margin 0.4s;
  margin-top: ${(props) => (props.open ? "-15px" : "-100vh")};
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  z-index: 5;
  padding: 25px;
`;
const StyledIconContainer = styled.div`
  margin-bottom: 25px;
  display: flex;
  color: white;
  width: auto;
`;

const StyledUserContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 15px;
  width: fit-content;
`;
const StyledHr = styled.div`
  margin-top: 10px;
  background-color: white;
  height: 1px;
  width: 150px;
`;

export default function NavMobile() {
  const { logout, user } = useAuth();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <StyledContainer>
        <StyledBurgerContainer onClick={toggleMenu}>
          <StyledBar open={isOpen} />
          <StyledBar open={isOpen} />
          <StyledBar open={isOpen} />
        </StyledBurgerContainer>

        <Link to="/">
          <Logo />
        </Link>
      </StyledContainer>

      <NavContainer open={isOpen}>
        {user && (
          <StyledUserContainer>
            <StyledIconContainer>
              {/* <NavItem labelKey={<Notification />} path="notifications" /> */}
              {location.pathname === "/" && <SearchInput />}
            </StyledIconContainer>

            <Text
              color="primary"
              size="l"
              weight="800"
              style={{ marginBottom: "10px" }}
            >
              {user?.firstname}
            </Text>
            <Link
              to="user/profile"
              style={{
                color: COLOR_WHITE,
                fontSize: "14px",
              }}
            >
              Mon profil
            </Link>
            <Text
              color="primary"
              onClick={() => logout()}
              style={{ cursor: "pointer", marginTop: "10px" }}
            >
              Se déconnecter
            </Text>
            <StyledHr />
          </StyledUserContainer>
        )}

        {user ? (
          <>
            <NavItem labelKey="Abonnements" path="/user/subscriptions" />
            <NavItem labelKey="Ma liste" path="user/list" />
          </>
        ) : (
          <Button
            label="S'identifier"
            link={"/login"}
            color="red"
            name={"login"}
            style={{ fontSize: "16px", marginLeft: "0", width: 'fit-content' }}
          />
        )}
      </NavContainer>
    </>
  );
}
