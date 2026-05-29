import { ShieldCheck } from "lucide-react";

import Button from "../../../components/ui/Button";
import { transferOwnershipConfig } from "../config/documentAccessConfig";
import type { TransferOwnershipCardProps } from "../types/documentAccessTypes";

function TransferOwnershipCard({
  newOwnerUsername,
  isTransferOwnershipDisabled,
  onNewOwnerUsernameChange,
  onTransferOwnership,
}: TransferOwnershipCardProps) {
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

          <input
            type="text"
            value={newOwnerUsername}
            onChange={onNewOwnerUsernameChange}
            placeholder={transferOwnershipConfig.newOwnerPlaceholder}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex justify-end pt-14">
          <Button
            type="button"
            disabled={isTransferOwnershipDisabled}
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