import { useMutation, useQueryClient } from "react-query";
import { message } from "antd";
import { updateUser, UpdateUserDto } from "@/apis/updateUser.api";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: number; data: UpdateUserDto }) => updateUser(id, data),
    {
      onSuccess: () => {
        message.success("User updated successfully");
        queryClient.invalidateQueries(["users"]);
      },
      onError: () => {
        message.error("Failed to update user");
      },
    }
  );
};
