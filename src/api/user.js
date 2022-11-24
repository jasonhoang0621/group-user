import { axiosClient } from ".";
import { useQuery, useMutation } from "react-query";

export const useLogin = () => {
  return useMutation((payload) => axiosClient.post("/login", payload));
};
export const loginGoogle = async () => {
  return await axiosClient.get("/loginGoogle");
};
export const useProfile = () => {
  return useQuery("profile", () => axiosClient.get("/profile"));
};
export const useRegister = () => {
  return useMutation((payload) => axiosClient.post("/register", payload));
};
export const useGetListUser = () => {
  return useQuery("user", () => axiosClient.get("/user"));
};
export const useEditProfile = () => {
  return useMutation((payload) => axiosClient.put("/profile", payload));
};
export const useChangePassword = () => {
  return useMutation((payload) => axiosClient.put("/change-password", payload));
};
