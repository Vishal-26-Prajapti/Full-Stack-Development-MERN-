export default function ShapeCard({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
      aspect-square
      rounded-2xl
      glass-card
      flex
      items-center
      justify-center
      hover:scale-105
      active:scale-95
      transition-all
      duration-300
    "
    >
      {children}
    </button>
  );
}
