import { useSelectedUserStore } from "../../app/store/useSelectedUserStore";
import SidebarNavItem from "../../shared/components/ui/SidebarNavItem";

import sidebarItems from "./configs/sidebarConfig";

function AppSidebar() {
  const users = useSelectedUserStore((state) => state.users);
  const selectedUser = useSelectedUserStore((state) => state.selectedUser);
  const isLoadingUsers = useSelectedUserStore((state) => state.isLoadingUsers);
  const selectUser = useSelectedUserStore((state) => state.selectUser);
  const userInitial = selectedUser?.name.charAt(0).toUpperCase() ?? "?";
  const canSeeRestrictedItems = selectedUser?.name.toLowerCase() === "admin";

  const visibleSidebarItems = sidebarItems.filter((item) => {
    if (!item.requiresAdmin) {
      return true;
    }

    return canSeeRestrictedItems;
  });

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white">
      <div className="flex h-screen flex-col">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              {userInitial}
            </div>
            <div>
              <h1 className="text-base font-semibold">Document Manager</h1>
              <p className="text-xs text-slate-400">{selectedUser?.name}</p>
            </div>
          </div>
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {visibleSidebarItems.map((item) => (
              <SidebarNavItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                path={item.path}
              />
            ))}
          </ul>
        </nav>

        <div className="flex-1" />

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold">
              {userInitial}
            </div>

            <div className="min-w-0 flex-1">
              <select
                value={selectedUser?.id ?? ""}
                disabled={isLoadingUsers || users.length === 0}
                onChange={(event) => selectUser(Number(event.target.value))}
                className="mt-1 w-full rounded-md border border-white/10 bg-slate-900 px-2 py-1 text-xs text-slate-300 outline-none hover:bg-slate-800"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
