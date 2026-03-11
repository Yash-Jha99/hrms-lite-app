import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Attendance, markAttendance } from "@/services/attendance";
import { fetchEmployees } from "@/services/employee";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  refetch: () => void;
  employeeId: string;
  date: string;
  attendance: Attendance[];
};

const MarkAttendanceTable = ({
  refetch,
  employeeId,
  date,
  attendance,
}: Props) => {
  const navigate = useNavigate();
  const [attendanceValues, setAttendanceValues] = useState<
    {
      employeeId: string;
      name: string;
      status: string;
      disabled: boolean;
    }[]
  >([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees_for_attendance"],
    queryFn: () => fetchEmployees({ page: 1, page_size: 100 }),
  });

  const markAttendanceMutation = useMutation({
    mutationKey: ["mark_new_attendance"],
    mutationFn: markAttendance,
    onError: (error: any) => {
      toast.error(error?.data?.errors?.[0] || "Something went wrong");
    },
    onSuccess: () => {
      resetForm();
      refetch();
      navigate({ resetScroll: true });
    },
  });

  const resetForm = () => {};

  const handleSubmit = () => {
    const data = attendanceValues
      .filter((val) => val.status !== "" && !val.disabled)
      .map((val) => ({
        employee_id: val.employeeId,
        date,
        status: val.status,
      }));

    if (!data.length) return toast.error("Mark atleast one attendance");

    markAttendanceMutation.mutate(data);
  };

  useEffect(() => {
    setAttendanceValues(
      data?.results.map((e) => {
        const status =
          attendance.find((att) => att.employee.id === e.id)?.status ?? "";

        return {
          employeeId: e.id,
          name: e.name,
          status,
          disabled: !!status,
        };
      }) ?? [],
    );
  }, [data, attendance]);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg font-medium">Mark Attendance</h4>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceValues.map(({ employeeId, name, status, disabled }) => (
              <TableRow key={employeeId}>
                <TableCell>{name}</TableCell>
                <TableCell>
                  <Select
                    disabled={disabled}
                    value={status}
                    onValueChange={(val) =>
                      setAttendanceValues((prevValue) =>
                        prevValue.map((e) =>
                          e.employeeId === employeeId
                            ? { ...e, status: val }
                            : e,
                        ),
                      )
                    }
                  >
                    <SelectTrigger id="status" className="">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button
        disabled={markAttendanceMutation.isPending}
        onClick={handleSubmit}
        className="self-start"
      >
        {markAttendanceMutation.isPending && <Spinner />} Save changes
      </Button>
    </div>
  );
};

export default MarkAttendanceTable;
