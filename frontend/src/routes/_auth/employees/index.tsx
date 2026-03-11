import AddEmployeeButton from "@/components/employee/add-employee-button";
import EmployeeTable from "@/components/employee/employee-table";
import { Spinner } from "@/components/ui/spinner";
import { fetchEmployees } from "@/services/employee";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const employeeSearchSchema = z.object({
  page: z.number().catch(1).optional(),
});

type ProductSearch = z.infer<typeof employeeSearchSchema>;

export const Route = createFileRoute("/_auth/employees/")({
  component: RouteComponent,
  validateSearch: (search) => employeeSearchSchema.parse(search),
});

function RouteComponent() {
  const searchParams = Route.useSearch();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["employees", searchParams],
    queryFn: () => fetchEmployees({ page: searchParams.page || 1 }),
    placeholderData: keepPreviousData,
  });

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center h-full">
        <Spinner className="size-8" />
      </div>
    );

  if (isError) return <p>Error in fetching employees</p>;

  return (
    <div className="flex flex-col gap-2 items-end">
      <h2 className="text-3xl font-semibold mb-2 self-start">Employees</h2>
      <AddEmployeeButton refetch={refetch} />
      <EmployeeTable
        employees={data?.results || []}
        totalCount={data?.count || 0}
        refetch={refetch}
      />
    </div>
  );
}
