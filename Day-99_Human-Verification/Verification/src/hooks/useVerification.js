import { useState } from "react";

export default function useVerification() {
  const [step, setStep] = useState("odd-one-out");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [draggedItem, setDraggedItem] = useState(null);

  const [matches, setMatches] = useState({
    square: false,
    hexagon: false,
    star: false,
  });

  const showError = () => {
    setError(true);

    setMatches({
      square: false,
      hexagon: false,
      star: false,
    });

    setTimeout(() => {
      setError(false);
    }, 1500);
  };

  const nextStep = (value) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(value);
    }, 700);
  };

  return {
    step,
    loading,
    error,
    draggedItem,
    setDraggedItem,
    matches,
    setMatches,
    showError,
    nextStep,
  };
}
