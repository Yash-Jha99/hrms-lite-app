import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/_auth/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2 flex flex-col gap-8">
      <h2 className="text-3xl font-semibold mb-2 self-start">Dashboard</h2>
      <div className="flex gap-10">
        <Link className="w-full max-w-sm" to="/employees">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage employees</p>
            </CardContent>
          </Card>
        </Link>
        <Link className="w-full max-w-sm" to="/attendance">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and mark attendance for employees</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
