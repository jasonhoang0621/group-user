import { useMutation, useQuery } from "react-query";
import { axiosClient } from ".";

export const useGetListGroup = () => {
  return useQuery("group", () => axiosClient.get("/groups"), {
    staleTime: Infinity,
  });
};

export const useCreateGroup = () => {
  return useMutation((payload) => axiosClient.post("/group", payload));
};

export const useDetailGroup = (id) => {
  return useQuery(["group", id], () => axiosClient.get(`/group/${id}`));
};

export const useAssignRole = () => {
  return useMutation((payload) => axiosClient.post("/assign", payload));
};

export const useRemoveUser = () => {
  return useMutation((payload) => axiosClient.post("/remove", payload));
};

export const useInviteUser = (groupId) => {
  return useMutation((payload) =>
    axiosClient.post(`/invite/${groupId}`, payload)
  );
};
export const useAcceptInvite = (inviteId) => {
  return useMutation((payload) =>
    axiosClient.post(`/invite/${inviteId}`, payload)
  );
};
