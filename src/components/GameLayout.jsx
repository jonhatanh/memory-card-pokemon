import { useEffect, useRef, useState } from 'react'
import PokemonCard from './PokemonCard'
import Modal from './Modal'
import MenuButton from './MenuButton'
import GameHeader from './GameHeader'
const pokemon = {
  id: 470,
  name: 'leafeon',
  sprites: {
    normal:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/470.png',
    animated:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/470.gif'
  }
}

function randomBoolean() {
  return !Math.floor(Math.random() * 2)
}

function getMessage (score, total) {
  let message = ''
  const percentage = (score / total) * 100

  if (percentage >= 70) {
    message = 'You are almost there!'
  } else if (percentage >= 50) {
    message = 'Not bad, keep going!'
  } else {
    message = randomBoolean() ? 'You can do better!' : 'Are you even trying?'
  }
  return message
}

function shuffleCards (list) {
  const newOrder = []
  const cardsAux = [...list]
  while (cardsAux.length !== 0) {
    const randomIndex = Math.floor(Math.random() * cardsAux.length)
    newOrder.push(cardsAux[randomIndex])
    cardsAux.splice(randomIndex, 1)
  }
  return newOrder
}

export default function GameLayout ({ handleOpenMainModal }) {
  const [pokemons, setPokemons] = useState([])
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  const [totalPokemons, setTotalPokemons] = useState(10)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [cardsSelected, setCardsSelected] = useState([])
  const [gameMessage, setGameMessage] = useState('Welcome!')
  const cardContainerRef = useRef(null)
  const gameMessageRef = useRef(null)

  const gameEnded = score === totalPokemons
  // Fetch Pokemons
  useEffect(() => {
    const pokeArray = []
    for (let i = 0; i < 10; i++) {
      pokeArray.push({ ...pokemon, id: i, name: pokemon.name + i })
    }
    setPokemons(pokeArray)
  }, [])

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
    }
  }, [score, totalPokemons])

  function handleClickSettings () {
    setSettingsIsOpen(true)
  }
  function handleCardClick (pokemonId) {
    if (cardsSelected.includes(pokemonId)) {
      setGameMessage(getMessage(score, totalPokemons))
      setCardsSelected([])
      setScore(0)
      gameMessageRef.current.classList.remove('hidden')
      gameMessageRef.current.classList.add('flex')
      return
    }
    setCardsSelected([...cardsSelected, pokemonId])
    setScore(score + 1)
    if (score + 1 !== totalPokemons) {
      cardContainerRef.current.classList.add('card-out')
    }
  }

  function handleAnimationEnd (e) {
    if (e.animationName === 'card-out') {
      const newPokemons = shuffleCards(pokemons)
      setPokemons(newPokemons)
      cardContainerRef.current.classList.remove('card-out')
      cardContainerRef.current.classList.add('card-in')
    } else if (e.animationName === 'card-in') {
      cardContainerRef.current.classList.remove('card-in')
    }
  }
  function handleAnimationEndMessage (e) {
    console.log(e)
    if (e.animationName !== 'messageAppear') return
    gameMessageRef.current.classList.remove('flex')
    gameMessageRef.current.classList.add('hidden')
  }

  const className = {
    'main-div': `absolute top-0 left-0 right-0 bottom-0 mx-auto min-h-dvh w-full flex flex-col justify-start gap-5 transition-all duration-300 max-w-screen-2xl ${settingsIsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`
  }
  return (
    <>
      <div className={className['main-div']}>
        {/* header */}
        <GameHeader
          handleClickSettings={handleClickSettings}
          score={score}
          bestScore={bestScore}
          totalPokemons={totalPokemons}
        />
        {/* Game Body */}
        <div
          ref={cardContainerRef}
          onAnimationEndCapture={handleAnimationEnd}
          className='mx-auto flex min-h-32 flex-wrap items-center justify-center gap-8 px-5 py-10 xl:max-w-screen-xl'
        >
          {/* Cards */}
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={settingsIsOpen}>
        <MenuButton onClick={() => setSettingsIsOpen(false)}>
          Back to game
        </MenuButton>
        <MenuButton onClick={() => ''}>
          Reroll pokemons (reset game with new pokemons)
        </MenuButton>
        <MenuButton onClick={() => handleOpenMainModal()}>
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
    </>
  )
}
