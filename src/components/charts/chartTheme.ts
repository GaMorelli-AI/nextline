export const chartColors = {
  emerald: "#34e0a1",
  teal: "#2dd4c8",
  cyan: "#34c9e8",
  warn: "#f0b23e",
  critical: "#f0553e",
  info: "#3ea6f0",
  grid: "rgba(135, 148, 172, 0.12)",
  axis: "#67748c",
  muted: "#4d586e",
};

export const chartGridProps = {
  stroke: chartColors.grid,
  strokeDasharray: "3 6",
  vertical: false,
};

export const chartAxisProps = {
  stroke: chartColors.axis,
  tick: { fill: chartColors.axis, fontSize: 11.5 },
  tickLine: false,
  axisLine: false,
};

export const tooltipContentStyle = {
  background: "var(--color-navy-600)",
  border: "1px solid var(--color-navy-500)",
  borderRadius: "10px",
  fontSize: "12.5px",
  padding: "8px 12px",
  boxShadow: "var(--shadow-elevated)",
};

// Uses the theme-flipping text tokens (not fixed hex) so the tooltip stays
// readable in both dark and light mode — the background above flips too.
export const tooltipLabelStyle = { color: "var(--color-slate-400)", marginBottom: 4, fontWeight: 500 };
export const tooltipItemStyle = { color: "var(--color-slate-100)" };
