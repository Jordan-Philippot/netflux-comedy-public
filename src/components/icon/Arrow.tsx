import styled from "styled-components";

const StyledArrow = styled.div`
  margin: auto 10px;
`;

type rotation = "left" | "right" | "bottom" | "top";

const handleRotation = (rotation: rotation) => {
  switch (rotation) {
    case "top":
      return "rotate(180deg)";
    case "bottom":
      return "rotate(0)";
    case "left":
      return "rotate(90deg)";
    case "right":
      return "rotate(270deg)";
  }
};

function Arrow({ rotation = "right" }: { rotation?: rotation }) {
  return (
    <StyledArrow>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={{ transform: handleRotation(rotation) }}
        width={22}
        height={22}
      >
        <path
          fill="#FFF"
          d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
        >
          {""}
        </path>
      </svg>
    </StyledArrow>
  );
}

export default Arrow;
