import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Attendance } from "@/services/attendance";
import { Badge } from "../ui/badge";
import dayjs from "dayjs";

type Props = {
  attendance: Attendance[];
};

const AttendanceTable = ({ attendance }: Props) => {
  const totalPresent = attendance.filter(
    (item) => item.status === "present",
  ).length;
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg font-medium">View Attendance</h4>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.map(({ id, date, status, employee }) => (
              <TableRow key={id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{dayjs(date).format("DD-MM-YYYY")}</TableCell>
                <TableCell>
                  <Badge
                    className="capitalize"
                    variant={status === "present" ? "default" : "destructive"}
                  >
                    {status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {attendance.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  {" "}
                  Attendance records are empty.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total Present</TableCell>
              <TableCell>{totalPresent}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default AttendanceTable;
