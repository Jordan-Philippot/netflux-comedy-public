import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import type { RootState } from "redux/store";

// ----------
// Component
// ----------
import Toaster from "components/ui/Toaster";

const StyledMessagesContainer = styled.div`
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
`;

const StyledToasterContainer = styled.div`
  position: relative;
  margin-top: 10px;
`;

function Messages() {
  const { messages } = useSelector((state: RootState) => state.app);

  return ReactDOM.createPortal(
    <StyledMessagesContainer>
      {messages.map((message) => (
        <StyledToasterContainer key={message.date}>
          <Toaster
            message={message.text}
            status={message.status}
            duration={2500}
            style={{ position: "relative" }}
          />
        </StyledToasterContainer>
      ))}
    </StyledMessagesContainer>,
    document.body
  );
}

export default Messages;
