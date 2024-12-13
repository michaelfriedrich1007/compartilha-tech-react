import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import axiosService from "../../services/axiosService";
import { User } from "../../types/user";

interface CreateUserParams {
  name: string;
  age: string;
  active: boolean;
}

export function useGetUsers(options?: UseQueryOptions<User[]>) {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosService.get<User[]>("/person");
      return response.data;
    },
    ...options,
  });
}

export function useCreateUser(options?: UseMutationOptions<User, unknown, CreateUserParams>) {
  return useMutation<User, unknown, CreateUserParams>({
    mutationKey: ["createUser"],
    mutationFn: async (params: CreateUserParams) => {
      try {
        const response = await axiosService.post<User>("/person", {
          name: params.name,
          age: parseInt(params.age ?? "0"),
          active: params.active,
        });

        return response.data;
      } catch (error) {
        console.log("error", error);
        throw error;
      }
    },
    ...options,
  });
}

