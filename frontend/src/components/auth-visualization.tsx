'use client'

import { useEffect, useRef } from 'react'

export function AuthVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    let frame = 0
    let animationFrame = 0

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const ratio = window.devicePixelRatio || 1
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio
        canvas.height = height * ratio
        context.setTransform(ratio, 0, 0, ratio, 0, 0)
      }

      context.clearRect(0, 0, width, height)
      context.strokeStyle = 'rgba(151, 163, 194, 0.13)'
      context.lineWidth = 1
      const grid = 48
      for (let x = 0; x <= width; x += grid) {
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
      }
      for (let y = 0; y <= height; y += grid) {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
      }

      const centerX = width * 0.55
      const centerY = height * 0.48
      const radius = Math.max(30, Math.min(width, height) * 0.22)
      for (let ring = 0; ring < 3; ring += 1) {
        context.beginPath()
        context.setLineDash([12 + ring * 4, 10 + ring * 3])
        context.arc(centerX, centerY, Math.max(8, radius - ring * 20), frame * 0.002 * (ring % 2 ? -1 : 1), Math.PI * 2 + frame * 0.002 * (ring % 2 ? -1 : 1))
        context.strokeStyle = `rgba(100, 161, 255, ${0.36 - ring * 0.08})`
        context.stroke()
      }
      context.setLineDash([])

      context.beginPath()
      context.strokeStyle = 'rgba(100, 161, 255, 0.6)'
      context.lineWidth = 2
      for (let x = 0; x <= width; x += 4) {
        const y = centerY + 80 + Math.sin(x * 0.014 + frame * 0.025) * 28
        if (x === 0) context.moveTo(x, y)
        else context.lineTo(x, y)
      }
      context.stroke()

      const dotX = centerX + Math.cos(frame * 0.025) * radius
      const dotY = centerY + Math.sin(frame * 0.025) * radius
      context.beginPath()
      context.fillStyle = '#64a1ff'
      context.arc(dotX, dotY, 4, 0, Math.PI * 2)
      context.fill()

      frame += 1
      animationFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
}
