import { axiosClient } from ".";
import { useQuery, useMutation } from "react-query";

export const useLogin = () => {
  return useMutation((payload) => axiosClient.post("/login", payload));
};
export const useVerify = () => {
  return useQuery("verify", () => axiosClient.get("/verify"));
};
export const useRegister = () => {
  return useMutation((payload) => axiosClient.post("/register", payload));
};
export const useGetListUser = () => {
  return useQuery("user", () => axiosClient.get("/user"));
};
export const useBlockUser = () => {
  return useMutation((payload) =>
    axiosClient.patch(`/deleteAccount/${payload}`)
  );
};
export const useUnblockUser = () => {
  return useMutation((payload) => axiosClient.patch(`/unban/${payload}`));
};
