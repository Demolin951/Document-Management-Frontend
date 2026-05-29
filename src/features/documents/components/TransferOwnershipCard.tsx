import { ShieldCheck } from "lucide-react";

import Button from "../../../components/ui/Button";
import { transferOwnershipConfig } from "../config/documentAccessConfig";
import type { TransferOwnershipCardProps } from "../types/documentAccessTypes";

function TransferOwnershipCard({
  accessUsers,
  newOwnerUsername,
  isTransferOwnershipDisabled,
  isActionLoading,
  onNewOwnerUsernameChange,
  onTransferOwnership,
}: TransferOwnershipCardProps) {
  const transferCandidates = accessUsers.filter(
    (accessUser) => accessUser.role !== "Owner",
  );

  const hasTransferCandidates = transferCandidates.length > 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <ShieldCheck size={18} strokeWidth={2.5} />
        </div>

        <h3 className="text-base font-bold text-slate-900">
          {transferOwnershipConfig.title}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-slate-700">
            {transferOwnershipConfig.newOwnerLabel}
          </label>

          <select
            value={newOwnerUsername}
            onChange={onNewOwnerUsernameChange}
            disabled={isActionLoading || !hasTransferCandidates}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option value="">
              {hasTransferCandidates ? "Select user" : "No users available"}
            </option>

            {transferCandidates.map((accessUser) => (
              <option key={accessUser.id} value={accessUser.username}>
                {accessUser.username} ({accessUser.role})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end pt-14">
          <Button
            type="button"
            disabled={isTransferOwnershipDisabled || isActionLoading}
            onClick={onTransferOwnership}
          >
            {transferOwnershipConfig.transferButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TransferOwnershipCard;
