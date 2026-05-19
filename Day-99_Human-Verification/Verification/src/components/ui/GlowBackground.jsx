export default function GlowBackground() {
  return (
    <>
      <div className="absolute -top-25 -left-25 w-55 h-55 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="absolute -bottom-30 -right-30 w-65 h-65 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-size-[40px_40px]" />
    </>
  );
}
