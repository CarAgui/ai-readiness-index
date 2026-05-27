export function RadarChart({ scores }) {
  const size = 340;
  const center = size / 2;
  const radius = 120;
  const levels = [0.25, 0.5, 0.75, 1];

  const points = scores.map((score, index) => {
    const angle = (Math.PI * 2 * index) / scores.length - Math.PI / 2;
    const valueRadius = radius * (score.percentage / 100);

    return {
      x: center + Math.cos(angle) * valueRadius,
      y: center + Math.sin(angle) * valueRadius,
      axisX: center + Math.cos(angle) * radius,
      axisY: center + Math.sin(angle) * radius,
      labelX: center + Math.cos(angle) * (radius + 34),
      labelY: center + Math.sin(angle) * (radius + 34),
      label: score.shortName
    };
  });

  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");

  function levelPolygon(level) {
    return scores
      .map((_, index) => {
        const angle = (Math.PI * 2 * index) / scores.length - Math.PI / 2;
        return `${center + Math.cos(angle) * radius * level},${center + Math.sin(angle) * radius * level}`;
      })
      .join(" ");
  }

  return (
    <svg className="h-full w-full" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Radar de AI Readiness">
      {levels.map((level) => (
        <polygon key={level} points={levelPolygon(level)} fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="1" />
      ))}
      {points.map((point) => (
        <line key={point.label} x1={center} y1={center} x2={point.axisX} y2={point.axisY} stroke="rgba(0,0,0,0.14)" />
      ))}
      <polygon points={polygon} fill="rgba(245,196,0,0.36)" stroke="#070707" strokeWidth="3" />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="4" fill="#070707" />
          <text x={point.labelX} y={point.labelY} textAnchor="middle" dominantBaseline="middle" className="fill-ink text-[9px] font-black">
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
