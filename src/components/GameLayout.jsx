import { useEffect, useState } from 'react'
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

export default function GameLayout ({ handleOpenMainModal }) {
  const [pokemons, setPokemons] = useState([])
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  const [totalPokemons, setTotalPokemons] = useState(10)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameEnded, setGameEnded] = useState(false)
  const [gameLoss, setGameLoss] = useState(false)
  const [cardsSelected, setCardsSelected] = useState([])

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
      setGameEnded(true)
    }
  }, [score, totalPokemons])

  function handleClickSettings () {
    setSettingsIsOpen(true)
  }
  function handleCardClick (pokemonId) {
    if (cardsSelected.includes(pokemonId)) {
      setGameLoss(true)
      setCardsSelected([])
      setScore(0)
      return
    }
    setCardsSelected([...cardsSelected, pokemonId])
    setScore(score + 1)
  }
  const className = {
    'main-div': `absolute top-0 left-0 right-0 bottom-0 mx-auto min-h-dvh w-full flex flex-col justify-start gap-5 transition-all duration-300 max-w-screen-2xl ${settingsIsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`
  }
  return (
    <>
      <div className={className['main-div']}>
        {/* header */}
        <GameHeader handleClickSettings={handleClickSettings} score={score} bestScore={bestScore} />
        {/* Game Body */}
        <div className='mx-auto flex min-h-32 flex-wrap items-center justify-center gap-8 px-5 py-10 outline outline-1 outline-red-500 xl:max-w-screen-xl'>
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
    </>
  )
}
