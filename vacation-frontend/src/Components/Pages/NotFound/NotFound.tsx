import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateAndDispatchJWT } from "../../Utils/JWTUtils";
import "./NotFound.css";

function NotFound(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (!validateAndDispatchJWT()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="NotFound">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        Please check the URL or return to the <a href="/">home page</a>.
      </p>
    </div>
  );
}

export default NotFound;
