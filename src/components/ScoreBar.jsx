export function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-black text-ink">{label}</span>
        <span className="font-black text-ink">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-black/10">
        <div className="h-full rounded-full bg-gold" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
