import apiClient from "@/lib/api-client";
import { Employee, PaginatedResponse } from "./employee";

export type Attendance = {
  id: string;
  date: string;
  status: string;
  employee: Employee;
};

export const fetchAttendance = async ({
  employeeId,
  date,
}: {
  employeeId?: string;
  date: string;
}) => {
  return apiClient
    .get<PaginatedResponse<Attendance[]>>(`/attendance/`, {
      params: {
        employeeId,
        date,
      },
    })
    .then((res) => res.data);
};

export const markAttendance = async (
  data: {
    employee_id: string;
    date: string;
    status: string;
  }[],
) => {
  return apiClient
    .post<Attendance>(`/attendance/`, data)
    .then((res) => res.data);
};
