import type { ReactNode } from "react";
import { Bell } from "lucide-react";
import { useLocation } from "react-router";

import { useSelectedUserStore } from "../../app/store/useSelectedUserStore";

import { getTopbarTitle } from "./utils/getTopbarTitle";

type TopbarProps = {
  actions?: ReactNode;
};

function Topbar({ actions }: TopbarProps) {
  const selectedUser = useSelectedUserStore((state) => state.selectedUser);
  const location = useLocation();

  const topbarTitle = getTopbarTitle(location.pathname);

  return (
    <header className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{topbarTitle}</h1>

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

        {actions}
      </div>
    </header>
  );
}

export default Topbar;
