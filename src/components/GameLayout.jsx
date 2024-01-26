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

function randomBoolean () {
  return !Math.floor(Math.random() * 2)
}

function getMessage (score, total) {
  let message = ''
  const percentage = (score / total) * 100

  if (percentage >= 70) {
    message = 'You\'re almost there!'
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

function getRandomNumbersInRange (qtyNumbers, min = 0, max = 649) {
  const array = []
  for (let i = 0; i < qtyNumbers;) {
    const randomNumber = Math.floor(Math.random() * (max + 1) + min)
    if (array.indexOf(randomNumber) !== -1) continue
    array.push(randomNumber)
    i++
  }
  return array
}

function getRandomPokemons(quantity) {
  const pokeIds = getRandomNumbersInRange(quantity)
  const pokePromises = pokeIds.map((id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  )
  return Promise.all(pokePromises)
    .then((responses) => {
      const jsonPromises = responses.map((res) => res.json())
      return Promise.all(jsonPromises)
    })
    .then((newPokemons) => {
      console.log(newPokemons)
      return newPokemons.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          sprites: {
            normal:
              pokemon.sprites.versions['generation-v']['black-white']
                .front_default,
            animated:
              pokemon.sprites.versions['generation-v']['black-white'].animated
                .front_default
          }
        }
      })
    })
}

export default function GameLayout ({ handleOpenMainModal }) {
  const [pokemons, setPokemons] = useState([])
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  const [totalPokemons, setTotalPokemons] = useState(3)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [cardsSelected, setCardsSelected] = useState([])
  const [gameMessage, setGameMessage] = useState('Welcome!')
  const cardContainerRef = useRef(null)
  const gameMessageRef = useRef(null)

  const gameEnded = score === totalPokemons
  // Fetch Pokemons
  useEffect(() => {
    // for (let i = 0; i < pokeIds.length; i++) {
    //   pokeArray.push({
    //     ...pokemon,
    //     id: pokeIds[i],
    //     name: pokemon.name + pokeIds[i]
    //   })
    // }
    const getPokemons = async () => {
      const newPokemons = await getRandomPokemons(totalPokemons)
      setPokemons(newPokemons)
    }
    getPokemons()
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
      gameMessageRef.current.classList.remove('hidden')
      gameMessageRef.current.classList.add('flex')
      cardContainerRef.current.classList.add('pointer-events-none')
    }

    const elementRef = cardContainerRef.current
    return () => {
      elementRef.classList.remove('pointer-events-none')
    }
  }, [score, totalPokemons])

  function handleClickSettings () {
    setSettingsIsOpen(true)
  }
  function handleCardClick (pokemonId) {
    if (cardsSelected.includes(pokemonId)) {
      setGameMessage(getMessage(score, totalPokemons))
      resetGame()
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

  async function handleRerollPokemons() {
    const newPokemons = await getRandomPokemons(totalPokemons)
    resetGame()
    setPokemons(newPokemons)
    setSettingsIsOpen(false)
  }

  function resetGame () {
    setCardsSelected([])
    setScore(0)
  }
  function increaseDifficulty () {
    setTotalPokemons(totalPokemons + 3)
  }
  function handleNextLevel () {
    resetGame()
    increaseDifficulty()
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
          gameEnded={gameEnded}
          handleNextLevel={handleNextLevel}
        />
        {/* Game Body */}
        <div
          ref={cardContainerRef}
          onAnimationEndCapture={handleAnimationEnd}
          className='mx-auto flex min-h-32 flex-wrap items-center justify-center gap-8 px-5 py-10 xl:max-w-screen-xl overflow-y-auto '
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
    </>
  )
}
