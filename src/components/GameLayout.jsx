import { faGear, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import PokemonCard from './PokemonCard'
import Modal from './Modal'
import MenuButton from './MenuButton'
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

export default function GameLayout({ handleOpenMainModal }) {
  const [pokemons, setPokemons] = useState(() => {
    const pokemons = []
    for (let i = 0; i < 10; i++) {
      pokemons.push({ ...pokemon, id: i, name: pokemon.name + i })
    }
    console.log(pokemons)
    return pokemons
  })
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)

  function handleClickSettings() {
    setSettingsIsOpen(true)
  }
  const className = {
    'main-div': `absolute top-0 left-0 right-0 bottom-0 mx-auto min-h-dvh w-full flex flex-col justify-start gap-5 transition-all duration-300 max-w-screen-2xl ${settingsIsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`
  }
  return (
    <>
      <div className={className['main-div']}>
        {/* header */}
        <header className='mt-10 flex flex-wrap border-2 border-sky-500'>
          {/* Top header */}
          <div className='relative flex flex-wrap w-full items-center justify-center gap-x-5'>
            <div className='flex flex-wrap items-center justify-center gap-1'>
              <img
                className='h-16 w-16 pb-1 '
                src='/src/assets/pokeball.png'
                alt='Pokeball image'
              />
              <h1 className='text-center text-6xl text-slate-700 drop-shadow-surrounded'>
                Memory Card Game
              </h1>
            </div>
            <div className='md:absolute md:right-3 flex flex-wrap items-center gap-2 text-4xl text-white'>
              <button onClick={() => handleClickSettings()} className=''>
                <FontAwesomeIcon className='mt-2' icon={faVolumeHigh} />
              </button>
              <button
                onClick={() => handleClickSettings()}
                className='ml-auto mr-3 text-4xl text-white hover:animate-spin'
              >
                <FontAwesomeIcon className='mt-2' icon={faGear} />
              </button>
            </div>
          </div>
          <div className='flex flex-1 flex-wrap items-center justify-center gap-5 text-3xl text-white'>
            <p>Current Score: 0</p>
            <p className='text-main drop-shadow-surrounded drop-shadow-surrounded-blue'>
              Best Score: 0
            </p>
          </div>
        </header>
        {/* Game Body */}
        <div className='mx-auto flex min-h-32 flex-wrap items-center justify-center gap-8 px-5 py-10 outline outline-1 outline-red-500 xl:max-w-screen-xl'>
          {/* Cards */}
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
