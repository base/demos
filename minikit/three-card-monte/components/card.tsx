"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface CardProps {
  id: number
  isFlipped: boolean
  image: string
  onClick: () => void
  isTarget: boolean
  width?: number
  height?: number
}

export const Card = ({ id, isFlipped, onClick, isTarget, width = 200, height = 280 }: CardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardFrontRef = useRef<HTMLCanvasElement>(null)

  // Draw card back (question marks)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Draw card back with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#4338ca")  // indigo-700
    gradient.addColorStop(1, "#3730a3")  // indigo-800
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add subtle pattern
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)"
    const patternSize = width < 160 ? 15 : 20
    
    for (let x = 0; x < canvas.width; x += patternSize) {
      for (let y = 0; y < canvas.height; y += patternSize) {
        if ((x + y) % (patternSize * 2) === 0) {
          ctx.fillRect(x, y, patternSize, patternSize)
        }
      }
    }

    // Draw elegant border
    ctx.strokeStyle = "#fcd34d"
    ctx.lineWidth = width < 160 ? 4 : 6
    ctx.strokeRect(width * 0.05, height * 0.05, width * 0.9, height * 0.9)
    
    // Add inner border for depth
    ctx.strokeStyle = "rgba(252, 211, 77, 0.3)"
    ctx.lineWidth = width < 160 ? 2 : 3
    ctx.strokeRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8)

    // Draw question marks with glow
    ctx.fillStyle = "#fcd34d"
    ctx.shadowColor = "#fcd34d"
    ctx.shadowBlur = width < 160 ? 8 : 12
    
    const fontSize = width < 160 ? 36 : 48
    ctx.font = `bold ${fontSize}px Arial`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Draw multiple question marks in a more elegant pattern
    const positions =
      width < 160
        ? [
            { x: canvas.width / 2, y: canvas.height / 2 - 20 },
            { x: canvas.width / 2 - 20, y: canvas.height / 2 + 20 },
            { x: canvas.width / 2 + 20, y: canvas.height / 2 + 20 },
          ]
        : [
            { x: canvas.width / 2, y: canvas.height / 2 - 40 },
            { x: canvas.width / 2 - 40, y: canvas.height / 2 + 40 },
            { x: canvas.width / 2 + 40, y: canvas.height / 2 + 40 },
            { x: canvas.width / 2, y: canvas.height / 2 },
          ]

    positions.forEach((pos) => {
      ctx.fillText("?", pos.x, pos.y)
    })
    
    // Reset shadow for performance
    ctx.shadowBlur = 0
  }, [width, height])

  // Update the card front rendering to make the target card more distinctive
  useEffect(() => {
    const canvas = cardFrontRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Draw elegant card background with gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    bgGradient.addColorStop(0, isTarget ? "#fefce8" : "#f8fafc")  // yellow-50 for target, slate-50 for others
    bgGradient.addColorStop(1, isTarget ? "#fef9c3" : "#f1f5f9")  // yellow-100 for target, slate-100 for others
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add subtle texture
    ctx.fillStyle = isTarget ? "rgba(250, 204, 21, 0.05)" : "rgba(100, 116, 139, 0.05)"
    const patternSize = width < 160 ? 8 : 10
    
    for (let x = 0; x < canvas.width; x += patternSize) {
      for (let y = 0; y < canvas.height; y += patternSize) {
        if ((x + y) % (patternSize * 2) === 0) {
          ctx.fillRect(x, y, patternSize, patternSize)
        }
      }
    }

    // Draw border with gradient
    const borderGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    
    if (isTarget) {
      borderGradient.addColorStop(0, "#f59e0b")  // amber-500
      borderGradient.addColorStop(0.5, "#fbbf24")  // amber-400
      borderGradient.addColorStop(1, "#f59e0b")  // amber-500
    } else {
      borderGradient.addColorStop(0, "#fcd34d")  // amber-300
      borderGradient.addColorStop(1, "#fbbf24")  // amber-400
    }
    
    ctx.strokeStyle = borderGradient
    ctx.lineWidth = isTarget ? (width < 160 ? 5 : 8) : width < 160 ? 3 : 5
    ctx.strokeRect(width * 0.05, height * 0.05, width * 0.9, height * 0.9)

    // Draw placeholder image or target indicator
    if (isTarget) {
      // For the target card, we'll draw a special indicator
      const img = new Image()
      img.crossOrigin = "anonymous"

      // Using placeholder for now, will be replaced with actual image
      img.src = "/colorful-paintbrush.png"

      img.onload = () => {
        const imageSize = width < 160 ? 80 : 120
        const offsetX = canvas.width / 2 - imageSize / 2
        const offsetY = canvas.height / 2 - imageSize / 2

        // Add drop shadow to image
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
        ctx.shadowBlur = 10
        ctx.shadowOffsetY = 3
        
        ctx.drawImage(img, offsetX, offsetY, imageSize, imageSize)
        
        // Reset shadow
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0

        // Add card title with gradient text
        const titleGradient = ctx.createLinearGradient(
          canvas.width / 2 - 50, 
          20, 
          canvas.width / 2 + 50, 
          40
        )
        titleGradient.addColorStop(0, "#b45309")  // amber-800
        titleGradient.addColorStop(1, "#92400e")  // amber-900
        
        ctx.fillStyle = titleGradient
        const fontSize = width < 160 ? 16 : 18
        ctx.font = `bold ${fontSize}px Arial`
        ctx.textAlign = "center"
        ctx.fillText("TARGET CARD", canvas.width / 2, 30)

        // Add a glow effect for the target card
        ctx.shadowColor = "#f59e0b"
        ctx.shadowBlur = width < 160 ? 15 : 20
        ctx.strokeStyle = "#f59e0b"
        ctx.strokeRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8)
        ctx.shadowBlur = 0
      }
    } else {
      // For non-target cards
      const img = new Image()
      img.crossOrigin = "anonymous"

      // Using placeholder for now, will be replaced with actual image
      img.src = id === 2 ? "/fantasy-card-item.png" : "/magical-item-card.png"

      img.onload = () => {
        const imageSize = width < 160 ? 80 : 120
        const offsetX = canvas.width / 2 - imageSize / 2
        const offsetY = canvas.height / 2 - imageSize / 2

        // Add drop shadow to image
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
        ctx.shadowBlur = 8
        ctx.shadowOffsetY = 2
        
        ctx.drawImage(img, offsetX, offsetY, imageSize, imageSize)
        
        // Reset shadow
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0

        // Add card title with gradient
        const titleGradient = ctx.createLinearGradient(
          canvas.width / 2 - 30, 
          20, 
          canvas.width / 2 + 30, 
          40
        )
        titleGradient.addColorStop(0, "#475569")  // slate-600
        titleGradient.addColorStop(1, "#334155")  // slate-700
        
        ctx.fillStyle = titleGradient
        const fontSize = width < 160 ? 14 : 16
        ctx.font = `bold ${fontSize}px Arial`
        ctx.textAlign = "center"
        ctx.fillText(`Card ${id}`, canvas.width / 2, 30)
      }
    }
  }, [id, isTarget, width, height])

  return (
    <div 
      className="relative cursor-pointer hover:scale-[1.02] transition-transform" 
      onClick={onClick} 
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <motion.div
        className="absolute w-full h-full backface-hidden rounded-xl shadow-xl"
        initial={false}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          opacity: isFlipped ? 0 : 1,
        }}
        transition={{ duration: 0.6 }}
      >
        <canvas ref={canvasRef} className="w-full h-full rounded-xl" />
      </motion.div>

      <motion.div
        className="absolute w-full h-full backface-hidden rounded-xl shadow-xl"
        initial={false}
        animate={{
          rotateY: isFlipped ? 0 : -180,
          opacity: isFlipped ? 1 : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        <canvas ref={cardFrontRef} className="w-full h-full rounded-xl" />
      </motion.div>
    </div>
  )
}
