import { useAuth } from "@/auth";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";

const Sidebar = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: "/" });
        });
      });
    }
  };
  return (
    <div className="py-3 px-8 justify-between flex gap-8 text-lg w-full max-w-3xs bg-muted h-full border-r">
      <div className="justify-start flex flex-col gap-3">
        <h2 className="font-bold text-2xl text-primary mb-8">HRMS Lite</h2>
        <span className="font-semibold mb-2">Admin</span>
        <Link
          to="/"
          activeProps={{
            className: "font-semibold text-primary",
          }}
          activeOptions={{ exact: true }}
        >
          Dashboard
        </Link>
        <Link
          to="/employees"
          activeProps={{
            className: "font-semibold text-primary",
          }}
          activeOptions={{ exact: true }}
        >
          Employees
        </Link>
        <Link
          to="/attendance"
          activeProps={{
            className: "font-semibold text-primary",
          }}
          activeOptions={{ exact: true }}
        >
          Attendance
        </Link>
        <button
          type="button"
          className="hover:underline mt-2 text-start"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
