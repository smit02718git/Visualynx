'use client'

import { useId, useMemo, useState } from 'react'

const G = 9.81
const VIEW_W = 400
const VIEW_H = 190

/**
 * Projectile-motion preview used in the hero.
 * Pure client-side math — swap `useState` for props/API data when a backend
 * simulation service is available.
 */
export function SimulationPanel({
  title = 'Kinematics: Projectile Motion',
  badge = '2D Physics',
  velocity = 14.2,
  initialAngle = 45,
}: {
  title?: string
  badge?: string
  velocity?: number
  initialAngle?: number
}) {
  const sliderId = useId()
  const [angle, setAngle] = useState(initialAngle)

  const { points, range, marker } = useMemo(() => {
    const rad = (angle * Math.PI) / 180
    const range = (velocity ** 2 * Math.sin(2 * rad)) / G
    const apex = (velocity ** 2 * Math.sin(rad) ** 2) / (2 * G)
    // Fixed world bounds keep the plot stable while the angle changes.
    const worldX = (velocity ** 2) / G
    const worldY = (velocity ** 2) / (2 * G)

    const count = 22
    const points = Array.from({ length: count }, (_, i) => {
      const x = (range * i) / (count - 1)
      const y = x * Math.tan(rad) - (G * x ** 2) / (2 * velocity ** 2 * Math.cos(rad) ** 2)
      return {
        cx: 24 + (x / worldX) * (VIEW_W - 48),
        cy: VIEW_H - 22 - (Math.max(y, 0) / worldY) * (VIEW_H - 54),
      }
    })

    const marker = points[Math.round(count * 0.62)]
    return { points, range, marker, apex }
  }, [angle, velocity])

  const tail = points[points.length - 4]

  return (
    <section
      aria-label="Interactive projectile motion simulation"
      className="overflow-hidden rounded-xl border border-deep-border bg-deep-card shadow-2xl shadow-black/40"
    >
      <header className="flex items-center justify-between gap-3 border-b border-deep-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-xs font-medium text-deep-foreground">{title}</span>
        </div>
        <span className="rounded-sm bg-primary/15 px-2 py-1 font-mono text-[9px] tracking-[0.16em] text-primary uppercase">
          {badge}
        </span>
      </header>

      <div className="px-4 pt-4">
        <div className="relative rounded-lg border border-deep-border bg-deep/80 p-2">
          <span className="absolute left-3 top-2 font-mono text-[9px] text-deep-muted">t (m)</span>
          <span className="absolute bottom-2 right-3 font-mono text-[9px] text-deep-muted">
            x (m)
          </span>
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="h-40 w-full sm:h-48"
            role="img"
            aria-label={`Trajectory arc at ${angle.toFixed(1)} degrees with a range of ${range.toFixed(2)} meters`}
          >
            <g stroke="currentColor" className="text-deep-border/70" strokeWidth="1">
              {Array.from({ length: 7 }, (_, i) => (
                <line
                  key={`v${i}`}
                  x1={24 + ((VIEW_W - 48) / 6) * i}
                  y1={16}
                  x2={24 + ((VIEW_W - 48) / 6) * i}
                  y2={VIEW_H - 22}
                />
              ))}
              {Array.from({ length: 4 }, (_, i) => (
                <line
                  key={`h${i}`}
                  x1={24}
                  y1={16 + ((VIEW_H - 38) / 3) * i}
                  x2={VIEW_W - 24}
                  y2={16 + ((VIEW_H - 38) / 3) * i}
                />
              ))}
            </g>

            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.cx}
                cy={p.cy}
                r={1.6}
                fill="currentColor"
                className="text-deep-muted"
              />
            ))}

            {tail && marker && (
              <line
                x1={marker.cx}
                y1={marker.cy}
                x2={tail.cx}
                y2={tail.cy}
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary"
              />
            )}
            {marker && (
              <circle cx={marker.cx} cy={marker.cy} r={4} fill="currentColor" className="text-primary" />
            )}
          </svg>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 items-center gap-4 border-t border-deep-border px-4 py-4 sm:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-2">
          <label htmlFor={sliderId} className="text-[11px] text-deep-muted">
            Launch Angle (θ)
          </label>
          <div className="flex items-center gap-3">
            <input
              id={sliderId}
              type="range"
              min={10}
              max={80}
              step={0.5}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-deep-border accent-primary"
            />
            <span className="w-14 shrink-0 text-right font-mono text-[11px] text-deep-foreground">
              {angle.toFixed(1)}°
            </span>
          </div>
        </div>
        <div className="sm:border-l sm:border-deep-border sm:pl-6">
          <p className="font-mono text-[9px] tracking-[0.16em] text-deep-muted uppercase">
            Velocity (v0)
          </p>
          <p className="mt-1 text-lg font-semibold text-deep-foreground">{velocity} m/s</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-deep-border bg-deep/60 px-4 py-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[9px] tracking-[0.16em] text-deep-muted uppercase">
            Kinematic calculations
          </p>
          <p className="mt-2 font-mono text-[11px] text-deep-foreground">
            {'y = x·tan(θ) − (g·x²) / (2·v0²·cos²(θ))'}
          </p>
        </div>
        <p className="font-mono text-[11px] text-primary">R_max = {range.toFixed(2)} m</p>
      </div>
    </section>
  )
}
