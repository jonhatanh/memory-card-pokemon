import { useEffect, useState } from "react"

export default function useScore() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

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


  return {
    score, setScore, bestScore
  }
}