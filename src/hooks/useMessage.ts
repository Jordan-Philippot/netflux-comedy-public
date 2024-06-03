import { useDispatch } from "react-redux";
import { createMessage } from "redux/app";

function useMessage() {
  const dispatch = useDispatch();

  const sendSuccess = (message: string) => {
    dispatch(
      createMessage({
        status: "success",
        text: message,
      })
    );
  };

  const sendError = (message: string) => {
    dispatch(
      createMessage({
        status: "error",
        text: message,
      })
    );
  };
  const sendInformation = (message: string) => {
    dispatch(
      createMessage({
        status: "default",
        text: message,
      })
    );
  };

  return {
    sendSuccess,
    sendError,
    sendInformation,
  };
}

export default useMessage;
