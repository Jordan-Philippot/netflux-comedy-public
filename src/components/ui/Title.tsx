import styled from "styled-components";
import type { PropsWithChildren } from "react";
import { COLOR_WHITE } from "utils/colors";
import { device } from "utils/breakpoints";

type titleSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type titleWeight = "200" | "400" | "600" | "800";

interface TitleProps {
  size?: titleSize;
  weight?: titleWeight;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLHeadingElement>;
}

const handleSizeStyle = (size?: titleSize, addMediaSize?: number) => {
  let mediaSize = addMediaSize ? addMediaSize : 0;

  switch (size) {
    case "h1":
      return { fontSize: 22 + mediaSize };
    case "h2":
      return { fontSize: 20 + mediaSize };
    case "h3":
      return { fontSize: 18 + mediaSize };
    case "h4":
      return { fontSize: 16 + mediaSize };
    case "h5":
      return { fontSize: 14 + mediaSize };
    case "h6":
      return { fontSize: 12 + mediaSize };
  }
};

// H1, H2 Responsive Done
const StyledTitle = styled.h1<TitleProps>`
  cursor: ${(props) => (props.onClick ? "pointer" : "initial")};
  font-size: ${(props) => handleSizeStyle(props.size)?.fontSize}px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0;
  lineheight: 35px;
  font-weight: ${(props) => props.weight};
  color: ${COLOR_WHITE};
  position: relative;
  @media ${device.tablet} {
    font-size: ${(props) => handleSizeStyle(props.size, 4)?.fontSize}px;
  }
  @media ${device.laptop} {
    font-size: ${(props) => handleSizeStyle(props.size, 6)?.fontSize}px;
  }
  @media ${device.laptopL} {
    font-size: ${(props) => handleSizeStyle(props.size, 8)?.fontSize}px;
  }
`;

function Title({
  children,
  size = "h1",
  weight = "400",
  style,
  onClick,
}: PropsWithChildren<TitleProps>) {
  return (
    <StyledTitle
      as={size}
      size={size}
      weight={weight}
      style={style}
      onClick={onClick}
    >
      {children}
    </StyledTitle>
  );
}

export default Title;
