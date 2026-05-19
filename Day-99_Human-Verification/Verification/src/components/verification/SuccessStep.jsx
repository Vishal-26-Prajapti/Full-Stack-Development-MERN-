import { CheckCircle2 } from "lucide-react";

export default function SuccessStep() {
  return (
    <div className="py-6 flex flex-col items-center justify-center animate-fade-up">
      <CheckCircle2 className="w-14 h-14 text-emerald-400 mb-3 animate-bounce" />

      <p className="text-emerald-400 font-semibold text-lg">
        Verification Complete
      </p>

      <p className="text-xs text-slate-400 mt-1">Secure link generated</p>
    </div>
  );
}
