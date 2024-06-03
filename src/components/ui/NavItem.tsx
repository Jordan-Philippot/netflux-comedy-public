import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { COLOR_GREY_LIGHT, COLOR_WHITE } from "utils/colors";

interface NavItemProps {
  labelKey: string | React.ReactNode;
  path: string;
  indexPath?: string;
}

interface StyledNavItemProps {
  isActive: boolean;
}

const StyledNavItem = styled.div<StyledNavItemProps>`
  padding: 10px 20px;
  color: ${(props) => (props.isActive ? COLOR_WHITE : COLOR_GREY_LIGHT)};
  font-size: 14px;
  text-decoration: none;
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  margin: auto;
  cursor: ${(props) => (props.isActive ? "default" : "pointer")};

  :hover {
    text-decoration: none;
    text-shadow: 0px 0px 1px ${COLOR_WHITE};
  }
`;

function NavItem({ labelKey, path, indexPath }: NavItemProps) {
  const location = useLocation();

  let isActive = location.pathname.includes(path);

  if (!isActive && indexPath !== undefined) {
    isActive = location.pathname === indexPath;
  }

  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <StyledNavItem isActive={isActive}>{labelKey}</StyledNavItem>
    </Link>
  );
}

export default NavItem;
