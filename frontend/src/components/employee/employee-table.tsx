import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Employee } from "@/services/employee";
import { getRouteApi, Link } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import DeleteEmployeeButton from "./delete-employee-button";

type Props = {
  employees: Employee[];
  totalCount: number;
  refetch: () => void;
};

const routeApi = getRouteApi("/_auth/employees/");

const EmployeeTable = ({ employees, totalCount, refetch }: Props) => {
  const searchParams = routeApi.useSearch();
  const page = searchParams.page ?? 1;
  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="flex flex-col gap-2 items-center w-full ">
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Total Present</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.total_present}</TableCell>
                <TableCell>
                  <DeleteEmployeeButton refetch={refetch} id={employee.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-4">
        <Link
          disabled={page === 1}
          aria-disabled={page === 1}
          className="flex gap-1 items-center  aria-disabled:text-muted-foreground "
          to="/employees"
          search={(prev) => ({ ...prev, page: (prev?.page ?? 1) - 1 })}
        >
          <ChevronLeftIcon size={20} />
          Previous
        </Link>
        <p className="text-sm">
          Page {page} of {totalPages}
        </p>
        <Link
          disabled={page === totalPages}
          aria-disabled={page === totalPages}
          className="flex gap-1 items-center  aria-disabled:text-muted-foreground "
          to="/employees"
          search={(prev) => ({ ...prev, page: (prev?.page ?? 1) + 1 })}
        >
          Next
          <ChevronRightIcon size={20} />
        </Link>
      </div>
    </div>
  );
};

export default EmployeeTable;
