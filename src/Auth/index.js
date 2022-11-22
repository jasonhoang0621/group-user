import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useVerify } from "src/api/user";
import LoadingScreen from "src/components/LoadingScreen";
import { getCookie } from "src/helpers/cookie";
import { login } from "src/redux/auth";

export const CheckAuth = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const { data } = useVerify();

  useEffect(() => {
    const token = localStorage.getItem("token") || getCookie("token");
    const verifyAccount = async () => {
      if (!user && !check) {
        if (token) {
          if (data.errorCode) {
            setCheck(false);
            navigate("/login");
          } else {
            setCheck(true);
            dispatch(login(data.data));
          }
        } else {
          setCheck(true);
        }
      }
    };
    verifyAccount();
  }, [check, user, dispatch, navigate, data]);

  // if (!user && !check) {
  //   return <LoadingScreen />;
  // }
  if (!user && check) {
    navigate("/login");
  }

  return children;
};
