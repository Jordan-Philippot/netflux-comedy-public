import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ModalProvider } from "components/context/ModalContext";

import App from "./App";
import VideoModal from "components/videoModal/VideoModal";

import reportWebVitals from "./reportWebVitals";
import stores from "./redux/store";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const { store, persistor } = stores;
const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <App />
            <VideoModal />

          </ModalProvider>
          {/* For react-query debugging */}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
