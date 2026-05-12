function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white">
      <div className="flext h-full flex-col">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              D
            </div>
            <div>
              <h1 className="text-base font-semibold">DocManager</h1>
              <p className="text-xs text-slate-400">Document System</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
