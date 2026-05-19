import DraggableShape from "../ui/DraggableShape";

import { SHAPES } from "../../utils/constants";

export default function DragDropStep({ matches, setDraggedItem, handleDrop }) {
  const allowDrop = (e) => e.preventDefault();

  return (
    <>
      <p className="text-center text-xs text-slate-400 mb-5">
        Match all shapes correctly
      </p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {SHAPES.map((shape) => (
          <div
            key={shape.id}
            onDragOver={allowDrop}
            onDrop={() => handleDrop(shape.id)}
            className="aspect-square rounded-2xl border border-dashed border-white/10 flex items-center justify-center bg-white/2"
          >
            {matches[shape.id] ? (
              <div className={`w-10 h-10 ${shape.color} ${shape.className}`} />
            ) : (
              <div className={`w-10 h-10 bg-slate-700/30 ${shape.className}`} />
            )}
          </div>
        ))}
      </div>

      {/* DRAG ITEMS */}
      <div className="grid grid-cols-3 gap-3 glass-card rounded-2xl p-3">
        {SHAPES.map((shape) => (
          <div
            key={shape.id}
            className="aspect-square flex items-center justify-center"
          >
            {!matches[shape.id] && (
              <DraggableShape
                draggable
                onDragStart={() => setDraggedItem(shape.id)}
                color={shape.color}
                className={shape.className}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
