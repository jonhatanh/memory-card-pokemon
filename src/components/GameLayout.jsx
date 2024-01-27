import { useEffect, useRef, useState } from 'react'
import PokemonCard from './PokemonCard'
import Modal from './Modal'
import MenuButton from './MenuButton'
import GameHeader from './GameHeader'
import {
  getRandomNumbersInRange,
  getMessage,
  getRandomPokemons,
  shuffleCards
} from '../helpers'
import { audios, pokemon } from '../constans'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function GameLayout({
  handleOpenMainModal,
  handleToggleMute,
  musicMuted
}) {
  const [pokemons, setPokemons] = useState([])
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  const [totalPokemons, setTotalPokemons] = useState(3)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [cardsSelected, setCardsSelected] = useState([])
  const [gameMessage, setGameMessage] = useState('Welcome!')
  const [sprite, setSprite] = useState('animated')
  const cardContainerRef = useRef(null)
  const gameMessageRef = useRef(null)
  const audioRef = useRef(null)

  const gameEnded = score === totalPokemons

  // Fetch Pokemons
  useEffect(() => {
    /* Development */
    // const pokeArray = []
    // const pokeIds = getRandomNumbersInRange(totalPokemons)
    // setPokemons([])
    // for (let i = 0; i < pokeIds.length; i++) {
    //   pokeArray.push({
    //     ...pokemon,
    //     id: pokeIds[i],
    //     name: pokemon.name + pokeIds[i]
    //   })
    // }
    // setTimeout(() => setPokemons(pokeArray), 1000)
    /* RealAPI */
    const getPokemons = async () => {
      setPokemons([])
      const newPokemons = await getRandomPokemons(totalPokemons)
      if (!ignore) setPokemons(newPokemons)
    }
    let ignore = false
    getPokemons()
    return () => {
      ignore = true
    }
  }, [totalPokemons])

  // Get Best Score
  useEffect(() => {
    const localBestScore = localStorage.getItem('bestScore')
    if (localBestScore) {
      setBestScore(Number(localBestScore))
    } else {
      localStorage.setItem('bestScore', 0)
    }
  }, [])
  // Update Best Score
  useEffect(() => {
    if (score > bestScore) {
      localStorage.setItem('bestScore', score)
      setBestScore(score)
    }
  }, [score, bestScore])
  // Game End
  useEffect(() => {
    if (score === totalPokemons) {
      setGameMessage('You did it! 🗿')
      showMessage()
    } else {
      score > 0 && cardContainerRef.current.classList.add('card-out')
    }

    const elementRef = cardContainerRef.current
    return () => {
      elementRef.classList.remove('pointer-events-none')
    }
  }, [score, totalPokemons])
  // Show message on gameMessage update
  function showMessage() {
    gameMessageRef.current.classList.remove('hidden')
    gameMessageRef.current.classList.add('flex')
  }

  function handleClickSettings() {
    setSettingsIsOpen(true)
  }
  function handleCardClick(pokemonId) {
    if (gameEnded) return
    if (cardsSelected.includes(pokemonId)) {
      setGameMessage(getMessage(score, totalPokemons))
      showMessage()
      playCardSound(false)
      resetGame()
      return
    }
    playCardSound(true)
    setCardsSelected([...cardsSelected, pokemonId])
    setScore(score + 1)
  }

  function playCardSound(success = true) {
    if (!audioRef) return
    audioRef.current.currentTime = 0
    audioRef.current.src = success ? audios.success : audios.fail
    audioRef.current.volume = success ? 1 : 0.3
    audioRef.current.play()
  }

  function handleAnimationEnd(e) {
    if (e.animationName === 'card-out') {
      const newPokemons = shuffleCards(pokemons)
      setPokemons(newPokemons)
      cardContainerRef.current.classList.remove('card-out')
      cardContainerRef.current.classList.add('card-in')
    } else if (e.animationName === 'card-in') {
      cardContainerRef.current.classList.remove('card-in')
    }
  }
  function handleAnimationEndMessage(e) {
    console.log(e)
    if (e.animationName !== 'messageAppear') return
    gameMessageRef.current.classList.remove('flex')
    gameMessageRef.current.classList.add('hidden')
  }

  async function handleRerollPokemons() {
    const newPokemons = await getRandomPokemons(totalPokemons)
    resetGame()
    setPokemons(newPokemons)
    setSettingsIsOpen(false)
  }

  function handleChangeSprite() {
    setSprite(sprite === 'normal' ? 'animated' : 'normal')
    setSettingsIsOpen(false)
  }

  function resetGame() {
    setCardsSelected([])
    setScore(0)
  }
  function increaseDifficulty() {
    setTotalPokemons(totalPokemons + 3)
  }
  function handleNextLevel() {
    resetGame()
    increaseDifficulty()
  }

  const className = {
    'main-div': `absolute top-0 left-0 right-0 bottom-0 mx-auto min-h-dvh w-full flex flex-col justify-start gap-5 transition-all duration-300 max-w-screen-2xl ${settingsIsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`
  }
  const spriteButtonData = {
    normal: {
      text: 'Change to animated sprites',
      icon: <FontAwesomeIcon icon={faStar} className='animate-bounce group-hover:animate-spin text-base' />
    },
    animated: {
      text: 'Change to static sprites',
      icon: null
    }
  }
  return (
    <>
      <div className={className['main-div']}>
        <GameHeader
          handleClickSettings={handleClickSettings}
          score={score}
          bestScore={bestScore}
          totalPokemons={totalPokemons}
          gameEnded={gameEnded}
          handleNextLevel={handleNextLevel}
          handleToggleMute={handleToggleMute}
          musicMuted={musicMuted}
        />
        {/* Game Body */}
        <div
          ref={cardContainerRef}
          onAnimationEndCapture={handleAnimationEnd}
          className='mx-auto flex min-h-32 flex-wrap items-center justify-center gap-8 overflow-y-auto px-5 py-10 xl:max-w-screen-xl '
        >
          {/* Cards */}
          {pokemons.length > 0 ? (
            pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                handleCardClick={handleCardClick}
                sprite={sprite}
              />
            ))
          ) : (
            <div className='flex flex-col items-center'>
              <img
                className='h-24 w-24 animate-spin'
                src='/src/assets/pokeball.png'
                alt='Pokeball image'
              />
              <p className='animate-pulse text-3xl text-white'>Loading...</p>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={settingsIsOpen}>
        <MenuButton onClick={() => setSettingsIsOpen(false)}>
          Back to game
        </MenuButton>
        <MenuButton onClick={handleChangeSprite}>
          {spriteButtonData[sprite].text} {spriteButtonData[sprite].icon}
        </MenuButton>
        <MenuButton onClick={handleRerollPokemons}>
          Reroll pokemons (reset current game with new pokemons)
        </MenuButton>
        <MenuButton onClick={handleOpenMainModal}>
          Go to main menu (end game)
        </MenuButton>
      </Modal>
      <div
        ref={gameMessageRef}
        onAnimationEnd={handleAnimationEndMessage}
        className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
      >
        <p className='game-message bg-gradient-to-r from-transparent via-secondary to-transparent px-20 py-1 text-6xl tracking-widest text-main'>
          {gameMessage}
        </p>
      </div>
      <audio src='' ref={audioRef} />
    </>
  )
}
