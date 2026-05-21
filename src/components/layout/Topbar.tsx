import { Bell } from "lucide-react";
import Button from "../ui/Button";
import { useAuthStore } from "../../features/auth/store/useAuthStore";

function Topbar() {
  const selectedUser = useAuthStore((state) => state.selectedUser);

  return (
    <header className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          Welcome back, {selectedUser?.name ?? "No user"}!
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <Bell size={18} strokeWidth={3} />
        </button>

        <Button>+ Upload Document</Button>
      </div>
    </header>
  );
}

export default Topbar;
