import { useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import { deactivateUser } from "@/apis/deleteUser.api";

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deactivateUser, {
    onSuccess: () => {
      message.success("User deactivated successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      message.error("Failed to deactivate user");
    },
  });
};
