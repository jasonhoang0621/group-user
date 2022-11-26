import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useProfile } from "src/api/user";
import { login } from "src/redux/auth";

const Authenticate = ({ children }) => {
  const { data } = useProfile();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (data) {
      dispatch(login(data?.data));
    }
  }, [data, dispatch]);
  return children;
};

export default Authenticate;
