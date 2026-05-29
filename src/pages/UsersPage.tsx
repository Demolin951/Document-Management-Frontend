import SectionCard from "../components/ui/SectionCard";
import { useAuthStore } from "../features/auth/store/useAuthStore";

function UsersPage() {
  const selectedUser = useAuthStore((state) => state.selectedUser);

  const isAdmin = selectedUser?.name === "admin";

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <SectionCard>
          <div className="px-6 py-10 text-center">
            <p className="text-sm font-semibold text-red-700">Access denied</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              Only admin can manage users.
            </p>
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionCard>
        <div className="px-6 py-10 text-center">
          <p className="text-sm font-semibold text-slate-500">
            Users management will be added later.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

export default UsersPage;
