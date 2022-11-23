import { notification } from "antd";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      //call api
    } else {
      notification.error({
        description: "Login failed",
        duration: 1,
      });
      navigate("/login");
    }
  }, [searchParams, navigate]);
};

export default GoogleRedirect;
