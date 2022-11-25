import { useProfile } from "src/api/user";

export const CheckAuth = ({ children }) => {
  const { data } = useProfile();

  if (data) return children;
};
