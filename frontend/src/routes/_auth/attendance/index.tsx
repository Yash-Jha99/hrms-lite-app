import { DatePicker } from "@/components/common/date-picker";
import AttendanceTable from "@/components/employee/attendance-table";
import MarkAttendanceTable from "@/components/employee/mark-attendance-table";
import { Spinner } from "@/components/ui/spinner";
import { fetchAttendance } from "@/services/attendance";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import z from "zod";

export const Route = createFileRoute("/_auth/attendance/")({
  validateSearch: z.object({
    employeeId: z.string().optional().catch(""),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { employeeId } = Route.useSearch();
  const divRef = useRef<HTMLDivElement>(null);

  const [attendanceDate, setAttendanceDate] = useState(() => {
    const date = new Date();
    return dayjs(date).format("YYYY-MM-DD");
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["attendance", employeeId, attendanceDate],
    queryFn: () => fetchAttendance({ employeeId, date: attendanceDate }),
  });

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center h-full">
        <Spinner className="size-8" />
      </div>
    );

  if (isError || !data) return <p>Error in fetching attendance records</p>;

  return (
    <div
      ref={divRef}
      className=" flex flex-col gap-6  w-full h-full overflow-y-auto"
    >
      <h2 className="text-3xl font-semibold mb-2 self-start">Attendance</h2>
      <div className="flex gap-4 items-center">
        <span>Date</span>
        <DatePicker
          id="date-picker"
          value={new Date(attendanceDate)}
          onChange={(date) =>
            setAttendanceDate(dayjs(date).format("YYYY-MM-DD"))
          }
        />
      </div>
      <AttendanceTable attendance={data.results || []} />
      <MarkAttendanceTable
        employeeId={employeeId || ""}
        refetch={() => {
          refetch();
          divRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }}
        date={attendanceDate}
        attendance={data.results || []}
      />
    </div>
  );
}
