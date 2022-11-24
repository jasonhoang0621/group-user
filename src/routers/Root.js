import { useState } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CheckAuth } from "src/Auth";
import GoogleRedirect from "src/components/GoogleRedirect";
import Login from "src/pages/Login";
import Register from "src/pages/Register";
import Verify from "src/pages/Verify";
import Authenticated from "./Authed";

const createQueryClient = () => {
  const queryCache = new QueryCache();
  return new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        notifyOnChangeProps: "tracked",
      },
    },
  });
};

const Root = () => {
  const [queryClient] = useState(createQueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/google" element={<GoogleRedirect />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route
            path="*"
            element={
              // <CheckAuth>
              <Authenticated />
              // </CheckAuth>
            }
          />
          <Route path="*" element={<Navigate to={`/login`} replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Root;
