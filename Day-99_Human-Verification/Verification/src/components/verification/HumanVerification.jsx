import { Lock } from "lucide-react";

import useVerification from "../../hooks/useVerification";

import OddOneOutStep from "./OddOneOutStep";
import DragDropStep from "./DragDropStep";
import SuccessStep from "./SuccessStep";
import LoadingOverlay from "./LoadingOverlay";
import ErrorToast from "./ErrorToast";

export default function HumanVerification() {
  const {
    step,
    loading,
    error,
    draggedItem,
    setDraggedItem,
    matches,
    setMatches,
    showError,
    nextStep,
  } = useVerification();

  const handleOddOneOut = (correct) => {
    if (correct) {
      nextStep("drag-drop");
    } else {
      showError();
    }
  };

  const handleDrop = (target) => {
    if (draggedItem === target) {
      const updated = {
        ...matches,
        [target]: true,
      };

      setMatches(updated);

      if (Object.values(updated).every(Boolean)) {
        nextStep("success");
      }
    } else {
      showError();
    }

    setDraggedItem(null);
  };

  return (
    <div className="relative w-full glass-card rounded-3xl p-5 shadow-2xl overflow-hidden animate-fade-up">
      {loading && <LoadingOverlay />}

      {error && <ErrorToast />}

      <div className="relative z-10">
        <h2 className="text-center text-xl font-bold text-white">
          Human Verification
        </h2>

        {step === "odd-one-out" && (
          <OddOneOutStep handleOddOneOut={handleOddOneOut} />
        )}

        {step === "drag-drop" && (
          <DragDropStep
            matches={matches}
            setDraggedItem={setDraggedItem}
            handleDrop={handleDrop}
          />
        )}

        {step === "success" && <SuccessStep />}

        {step !== "success" && (
          <div className="text-center text-[10px] uppercase tracking-[0.3em] text-slate-600 mt-5 mb-4">
            I am Not A Robot
          </div>
        )}

        <button
          disabled={step !== "success"}
          className={`
            w-full
            py-3
            rounded-2xl
            flex
            items-center
            justify-center
            gap-2
            text-sm
            font-medium
            transition-all
            duration-300

            ${
              step === "success"
                ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white"
                : "bg-white/3 border border-white/10 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          Generate Link
          <Lock className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
