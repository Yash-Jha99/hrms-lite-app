import apiClient from "@/lib/api-client";

export const login = async (data: { username: string; password: string }) => {
  return apiClient
    .post<{ token: string }>("/auth-token/", data)
    .then((res) => res.data);
};
