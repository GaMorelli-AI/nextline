function hash(s: string, seed = 0): number {
  let h = seed;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function FakeQrCode({ value, size = 128 }: { value: string; size?: number }) {
  const grid = 21;
  const cell = size / grid;
  const cells: boolean[][] = [];
  for (let y = 0; y < grid; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < grid; x++) {
      row.push(hash(`${value}-${x}-${y}`) % 5 < 2);
    }
    cells.push(row);
  }

  const finder = (ox: number, oy: number) => (
    <g key={`${ox}-${oy}`}>
      <rect x={ox * cell} y={oy * cell} width={cell * 7} height={cell * 7} fill="#fff" />
      <rect x={(ox + 1) * cell} y={(oy + 1) * cell} width={cell * 5} height={cell * 5} fill="#05070d" />
      <rect x={(ox + 2) * cell} y={(oy + 2) * cell} width={cell * 3} height={cell * 3} fill="#fff" />
    </g>
  );

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="rounded-[6px] bg-white p-1">
      {cells.map((row, y) =>
        row.map((on, x) => {
          const inFinder =
            (x < 8 && y < 8) || (x > grid - 9 && y < 8) || (x < 8 && y > grid - 9);
          if (inFinder || !on) return null;
          return <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill="#05070d" />;
        })
      )}
      {finder(0, 0)}
      {finder(grid - 7, 0)}
      {finder(0, grid - 7)}
    </svg>
  );
}
