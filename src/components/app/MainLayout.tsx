import styled from "styled-components";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { COLOR_BLACK } from "utils/colors";

// ----------
// Component
// ----------
import Messages from "components/app/Messages";
import Nav from "components/app/Nav";
import Footer from "./Footer";

interface StyledNavProps {
  isVisible: boolean;
}

const StyledLayout = styled.div`
  position: relative;
  z-index: 1;
  width: 100vw;
  overflow-x: hidden;
  background-color: ${COLOR_BLACK};
  font-family: "Poppins", sans-serif;
`;

const StyledHeader = styled.header<StyledNavProps>`
  position: ${(props) => (props.isVisible ? "fixed" : "relative")};
  z-index: 10;
  box-sizing: border-box;
  width: 100%;
`;


const StyledContainer = styled.div`
`;

function MainLayout() {
  const [isVisible, setIsVisible] = useState(true);

  window.addEventListener("scroll", function () {
    const windowHeght = window.innerHeight as number;
    const scrollOffset = window.scrollY as number;
    if (scrollOffset > windowHeght + 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <StyledLayout>
      <StyledHeader isVisible={isVisible}>
        <Nav />
      </StyledHeader>

      <StyledContainer>
        <Outlet />
      </StyledContainer>
      <Footer />

      <Messages />
    </StyledLayout>
  );
}

export default MainLayout;
