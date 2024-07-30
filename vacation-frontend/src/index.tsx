import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import MainLayout from "./Components/Layout/MainLayout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Set the CSS variable for header height
const setHeaderHeight = () => {
  const header = document.querySelector(".main-header");
  if (header) {
    const headerHeight = header.clientHeight;
    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
  }
};

// Call the function initially and on window resize
window.addEventListener("load", setHeaderHeight);
window.addEventListener("resize", setHeaderHeight);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <CssBaseline />
    <MainLayout />
    <ToastContainer
      autoClose={2000}
      closeButton={false}
      closeOnClick
      draggable
      hideProgressBar={false}
      limit={3}
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position="top-left"
      rtl={false}
      transition={Zoom}
      className="custom-toast-container"
      toastClassName="custom-toast"
    />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
