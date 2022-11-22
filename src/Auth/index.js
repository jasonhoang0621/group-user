import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userAPI from "src/api/user";
import LoadingScreen from "src/components/LoadingScreen";
import { getCookie } from "src/helpers/cookie";
import { login } from "src/redux/auth";

export const CheckAuth = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || getCookie("token");
    const verifyAccount = async () => {
      if (!user && !check) {
        if (token) {
          const res = await userAPI.verify();
          if (res.errorCode) {
            setCheck(false);
            navigate("/login");
          } else {
            setCheck(true);
            dispatch(login(res.data));
          }
        } else {
          setCheck(true);
        }
      }
    };
    verifyAccount();
  }, [check, user, dispatch, navigate]);

  if (!user && !check) {
    return <LoadingScreen />;
  }
  if (!user && check) {
    navigate("/login");
  }

  return children;
};
