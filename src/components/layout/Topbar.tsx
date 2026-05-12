import Button from "../../features/dashboard/components/ui/Button";

function Topbar() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back, Name</p>
      </div>

      <Button> +Upload Document</Button>
    </header>
  );
}

export default Topbar;
