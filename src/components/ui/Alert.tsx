import styled from "styled-components";
import type { PropsWithChildren } from "react";
import type { Status } from "redux/app";
import Text from "components/ui/Text";
import CheckCircle from "components/icon/CheckCircle";
import ErrorCircle from "components/icon/ErrorCircle";
import ExclamationTriangle from "components/icon/ExclamationTriangle";
import InfoCircle from "components/icon/InfoCircle";
import {
  COLOR_PRIMARY_1,
  COLOR_ERROR,
  COLOR_SUCCESS,
  COLOR_WARNING,
} from "utils/colors";

interface AlertProps {
  status?: Status;
  hasTitle?: boolean;
}

interface AlertWithText extends AlertProps {
  text: string;
  children?: undefined;
}

interface AlertWithoutText extends AlertProps {
  text?: undefined;
}

const renderIcon = (status: Status) => {
  switch (status) {
    case "default":
      return <InfoCircle />;
    case "success":
      return <CheckCircle />;
    case "warning":
      return <ExclamationTriangle />;
    case "error":
      return <ErrorCircle />;
  }
};

const handleBackgroundColor = (status: Status) => {
  switch (status) {
    case "default":
      return COLOR_PRIMARY_1;
    case "success":
      return COLOR_SUCCESS;
    case "warning":
      return COLOR_WARNING;
    case "error":
      return COLOR_ERROR;
  }
};

type StyledAlertProps = Omit<AlertProps, "status" | "text"> & {
  status: Status;
};

const StyledAlert = styled.aside<StyledAlertProps>`
  position: relative;
  display: inline-block;
  font-family: "Poppins", sans-serif;
  background-color: ${({ status }) => handleBackgroundColor(status)};
  color: white;
  padding: 15px 20px;
  border-radius: 3px;
  min-width: 200px;
  width: fit-content;
  text-align: center;
  text-align: left;
`;
const StyledAlertTitle = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

function Alert({
  children,
  status = "default",
  hasTitle = false,
  text,
}: AlertWithText | PropsWithChildren<AlertWithoutText>) {
  return (
    <StyledAlert status={status}>
      {hasTitle && (
        <StyledAlertTitle>
          {renderIcon(status)}
          <Text size="l" style={{ marginLeft: "10px" }}>
            {status === "default" ? "Information" : status}
          </Text>
        </StyledAlertTitle>
      )}
      {text && <Text size="m">{text}</Text>}
      {children}
    </StyledAlert>
  );
}

export default Alert;
