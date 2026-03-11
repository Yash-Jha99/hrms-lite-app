import apiClient from "@/lib/api-client";

export type PaginatedResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  total_present: string;
};

type EmployeesParams = {
  page: number;
  page_size?: number;
};

export const fetchEmployees = async (params: EmployeesParams) => {
  return apiClient
    .get<PaginatedResponse<Employee[]>>("/employee/", { params })
    .then((res) => res.data);
};

export const createEmployee = async (
  data: Pick<Employee, "name" | "email" | "department">,
) => {
  return apiClient.post<Employee>("/employee/", data).then((res) => res.data);
};

export const deleteEmployee = async (id: string) => {
  return apiClient.delete(`/employee/${id}/`).then((res) => res.data);
};
