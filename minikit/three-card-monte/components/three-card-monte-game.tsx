"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/card"
import { GameControls } from "@/components/game-controls"
import { Leaderboard } from "@/components/leaderboard"
import { UsernameModal } from "@/components/username-modal"
import { shuffle } from "@/lib/shuffle"
import confetti from "canvas-confetti"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useMiniKit } from "@coinbase/onchainkit/minikit"
import { ClaimRewardButton } from "@/components/ClaimReward"
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet"
import {
  Address,
  Avatar,
  Name,
  Identity,
} from "@coinbase/onchainkit/identity"
import { color } from "@coinbase/onchainkit/theme"

// Wallet component
function WalletComponents() {
  return (
    <div className="w-full flex justify-center mb-5">
      <div className="bg-gradient-to-r from-indigo-900/70 to-purple-900/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-indigo-500/30">
        <Wallet>
          <ConnectWallet className="flex items-center gap-2 text-white">
            <Avatar className="h-6 w-6 border-2 border-indigo-400/50 rounded-full" />
            <Name className="font-medium" />
          </ConnectWallet>
          <WalletDropdown className="bg-indigo-950 border border-indigo-400/30 shadow-xl rounded-xl mt-2">
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar className="h-10 w-10 mb-1 border-2 border-indigo-400/50 rounded-full" />
              <Name className="font-semibold text-white" />
              <Address className={color.foregroundMuted} />
            </Identity>
            <WalletDropdownDisconnect className="px-4 py-3 hover:bg-indigo-800/30 text-indigo-200 transition-colors duration-200" />
          </WalletDropdown>
        </Wallet>
      </div>
    </div>
  )
}

export const ThreeCardMonteGame = () => {
  const { context } = useMiniKit()
  const [cards, setCards] = useState([
    { id: 1, isTarget: true, flipped: false, image: "/images/card1.png" },
    { id: 2, isTarget: false, flipped: false, image: "/images/card2.png" },
    { id: 3, isTarget: false, flipped: false, image: "/images/card3.png" },
  ])
  const [isShuffling, setIsShuffling] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState("Click 'Start Game' to begin!")
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false)
  const [username, setUsername] = useState<string>("")
  const [userWon, setUserWon] = useState(false)

  // Check if the device is mobile
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  useEffect(() => {
    // Check if we have a context with user information
    if (context?.user?.displayName) {
      setUsername(context.user.displayName)
    } else {
      // If no context or no display name, show the username modal
      setIsUsernameModalOpen(true)
    }
  }, [context])

  // Function to handle username submission
  const handleUsernameSubmit = (name: string) => {
    setUsername(name)
    setIsUsernameModalOpen(false)
  }

  // Function to trigger confetti animation
  const triggerConfetti = () => {
    // Create a canvas-confetti instance with responsive settings
    const particleCount = isMobile ? 80 : 150
    const spread = isMobile ? 50 : 70

    confetti({
      particleCount,
      spread,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FFA500", "#FF4500", "#00BFFF", "#7CFC00"],
    })

    // Fire another burst after a short delay for a more dramatic effect
    setTimeout(() => {
      confetti({
        particleCount: isMobile ? 50 : 100,
        angle: 60,
        spread: isMobile ? 40 : 55,
        origin: { x: 0 },
        colors: ["#FFD700", "#FFA500", "#FF4500"],
      })
    }, 200)

    setTimeout(() => {
      confetti({
        particleCount: isMobile ? 50 : 100,
        angle: 120,
        spread: isMobile ? 40 : 55,
        origin: { x: 1 },
        colors: ["#00BFFF", "#7CFC00", "#FF1493"],
      })
    }, 400)
  }

  const startGame = () => {
    // Only flip the target card to show it to the player
    setCards(
      cards.map((card) => ({
        ...card,
        flipped: card.isTarget,
      })),
    )
    setGameStarted(true)
    setGameEnded(false)
    setUserWon(false)
    setMessage("Remember the target card!")

    // Show target card for 2 seconds, then flip and shuffle
    setTimeout(() => {
      setCards(cards.map((card) => ({ ...card, flipped: false })))
      setTimeout(() => {
        shuffleCards()
      }, 500)
    }, 2000)
  }

  const shuffleCards = () => {
    setIsShuffling(true)
    setMessage("Cards are shuffling...")

    // Perform multiple shuffles with animation delays
    const shuffleCount = 5
    let currentShuffle = 0

    const performShuffle = () => {
      if (currentShuffle < shuffleCount) {
        setCards((prevCards) => shuffle([...prevCards]))
        currentShuffle++
        setTimeout(performShuffle, 600)
      } else {
        setIsShuffling(false)
        setMessage("Select the target card!")
      }
    }

    performShuffle()
  }

  const handleCardClick = (id: number) => {
    if (isShuffling || gameEnded || !gameStarted) return

    const selectedCard = cards.find((card) => card.id === id)

    setCards(cards.map((card) => (card.id === id ? { ...card, flipped: true } : card)))

    setGameEnded(true)

    if (selectedCard?.isTarget) {
      setScore((prev) => prev + 1)
      setMessage("🎉 Correct! You found the target card!")
      setUserWon(true)

      // Trigger confetti animation when the user wins
      triggerConfetti()
      
      // Remove automatic leaderboard popup
    } else {
      setMessage("❌ Wrong card! The target was elsewhere.")
      setUserWon(false)
    }

    // Reveal all cards after a short delay
    setTimeout(() => {
      setCards(cards.map((card) => ({ ...card, flipped: true })))
    }, 1000)
  }

  const resetGame = () => {
    setCards([
      { id: 1, isTarget: true, flipped: false, image: "/images/card1.png" },
      { id: 2, isTarget: false, flipped: false, image: "/images/card2.png" },
      { id: 3, isTarget: false, flipped: false, image: "/images/card3.png" },
    ])
    setGameStarted(false)
    setGameEnded(false)
    setUserWon(false)
    setMessage("Click 'Start Game' to begin!")
  }

  // Calculate card dimensions based on screen size
  const getCardDimensions = () => {
    if (isMobile) {
      return { width: 140, height: 196 }
    } else if (isTablet) {
      return { width: 160, height: 224 }
    } else {
      return { width: 200, height: 280 }
    }
  }

  const cardDimensions = getCardDimensions()

  const openLeaderboard = () => {
    setIsLeaderboardOpen(true)
  }

  const closeLeaderboard = () => {
    setIsLeaderboardOpen(false)
  }

  return (
    <div className="flex flex-col items-center relative">
      {/* Fixed leaderboard button in top right corner */}
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={openLeaderboard}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-lg transition-colors shadow-md flex items-center gap-2"
        >
          <span className="text-xl">🏆</span> Leaderboard
        </button>
      </div>
    
      <div className="mb-8 text-center px-4 w-full max-w-2xl mx-auto">
        {/* Game message */}
        <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-sm rounded-xl px-6 py-4 mb-6 border border-indigo-500/20 shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-0 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">{message}</h2>
        </div>
        
        {/* Score and player info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
          <div className="bg-gradient-to-r from-yellow-600/30 to-yellow-800/30 backdrop-blur-sm px-6 py-3 rounded-lg border border-yellow-500/30 shadow-md min-w-[140px]">
            <p className="text-yellow-300 font-bold text-lg m-0">Score: {score}</p>
          </div>
          
          {username && (
            <div className="bg-indigo-900/30 px-6 py-3 rounded-lg backdrop-blur-sm border border-indigo-500/20 shadow-md min-w-[140px]">
              <p className="text-gray-300 text-sm m-0">
                Playing as: <span className="font-medium text-blue-300">{username}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Wallet Component */}
      <WalletComponents />

      <div className={`relative w-full ${isMobile ? "h-[500px]" : "h-[300px]"} mb-6 sm:mb-8`}>
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} justify-center items-center h-full gap-4 sm:gap-6`}>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              layout
              initial={{ rotateY: 0 }}
              animate={{
                x: isShuffling && !isMobile ? Math.sin(Date.now() / 150 + index * 2) * 20 : 0,
                y: isShuffling
                  ? isMobile
                    ? Math.sin(Date.now() / 150 + index * 2) * 20
                    : Math.cos(Date.now() / 200 + index * 3) * 10
                  : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.5,
              }}
              className="mx-2 sm:mx-4"
            >
              <Card
                id={card.id}
                isFlipped={card.flipped}
                image={card.image}
                onClick={() => handleCardClick(card.id)}
                isTarget={card.isTarget}
                width={cardDimensions.width}
                height={cardDimensions.height}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <GameControls
        onStart={startGame}
        onReset={resetGame}
        onShuffle={shuffleCards}
        gameStarted={gameStarted}
        gameEnded={gameEnded}
        isShuffling={isShuffling}
      />

      {/* Only render the ClaimRewardButton when user wins */}
      {userWon && gameEnded && (
        <div className="mt-8 p-5 bg-gradient-to-r from-purple-900/70 to-indigo-900/70 rounded-xl backdrop-blur-sm border border-indigo-500/50 shadow-lg max-w-md w-full mx-auto">
          <h3 className="text-xl text-yellow-400 text-center mb-4 font-medium">🎁 Claim Your Win Reward!</h3>
          <ClaimRewardButton hasWon={true} />
        </div>
      )}

      <Leaderboard
        isOpen={isLeaderboardOpen}
        onClose={closeLeaderboard}
        userScore={score}
        userName={username}
      />

      <UsernameModal
        isOpen={isUsernameModalOpen}
        onSubmit={handleUsernameSubmit}
      />
    </div>
  )
}
