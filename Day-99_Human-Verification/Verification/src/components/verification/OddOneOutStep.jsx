import ShapeCard from "../ui/ShapeCard";

export default function OddOneOutStep({ handleOddOneOut }) {
  return (
    <>
      <p className="text-center text-sm text-slate-400 mb-4 mt-1">
        Tap the different shape
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-63 mx-auto">
        {[1, 2, 3].map((item) => (
          <ShapeCard key={item} onClick={() => handleOddOneOut(false)}>
            <div className="w-12 h-12 bg-yellow-400 clip-hexagon" />
          </ShapeCard>
        ))}

        <ShapeCard onClick={() => handleOddOneOut(true)}>
          <div className="w-12 h-12 bg-emerald-400 rounded-md" />
        </ShapeCard>
      </div>
    </>
  );
}
