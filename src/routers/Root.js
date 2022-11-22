import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CheckAuth } from "src/Auth";
import Login from "src/pages/Login";
import Authenticated from "./Authed";

const Root = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <CheckAuth>
              <Authenticated />
            </CheckAuth>
          }
        />
        <Route path="*" element={<Navigate to={`/login`} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
