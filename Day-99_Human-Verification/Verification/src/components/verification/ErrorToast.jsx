import { AlertCircle } from "lucide-react";

export default function ErrorToast() {
  return (
    <div className="absolute top-3 left-3 right-3 bg-red-500 text-white text-xs px-3 py-2 rounded-xl flex items-center gap-2 animate-shake z-50">
      <AlertCircle className="w-4 h-4" />

      <span>Verification failed. Try again.</span>
    </div>
  );
}
