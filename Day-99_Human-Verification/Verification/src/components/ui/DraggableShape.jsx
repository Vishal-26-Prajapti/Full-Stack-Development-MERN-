export default function DraggableShape({
  draggable,
  onDragStart,
  color,
  className,
}) {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      className={`
        w-10
        h-10
        ${color}
        ${className}
        cursor-grab
        active:cursor-grabbing
        hover:scale-110
        transition-all
        duration-300
        animate-float
      `}
    />
  );
}
