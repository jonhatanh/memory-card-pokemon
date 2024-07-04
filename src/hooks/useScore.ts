import { useEffect, useRef, useState } from "react"

export default function useScore(totalPokemons: number) {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameMessage, setGameMessage] = useState('Welcome!')
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const gameMessageRef = useRef<HTMLDivElement>(null)

  // Get Best Score
  useEffect(() => {
    const localBestScore = localStorage.getItem('bestScore')
    if (localBestScore) {
      setBestScore(Number(localBestScore))
    } else {
      localStorage.setItem('bestScore', '0')
    }
  }, [])
  // Update Best Score
  useEffect(() => {
    if (score > bestScore) {
      localStorage.setItem('bestScore', String(score))
      setBestScore(score)
    }
  }, [score, bestScore])

  // Game End
  useEffect(() => {
    if (score === totalPokemons) {
      setGameMessage('You did it! 🗿')
      showMessage()
    } else {
      score > 0 && cardContainerRef.current?.classList.add('card-out')
    }

    const elementRef = cardContainerRef.current
    return () => {
      elementRef?.classList.remove('pointer-events-none')
    }
  }, [score, totalPokemons])
  // Show message on gameMessage update
  function showMessage() {
    if (!gameMessageRef.current) return
    gameMessageRef.current.classList.remove('hidden')
    gameMessageRef.current.classList.add('flex')
  }


  return {
    score, setScore, bestScore, gameMessage, setGameMessage, cardContainerRef, gameMessageRef, showMessage
  }
}