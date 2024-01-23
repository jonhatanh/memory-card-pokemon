import { faCaretRight, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const pokemon = {
  id: 470,
  name: 'leafeon',
  sprites: {
    versions: {
      'generation-v': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/470.gif'
      }
    }
  }
}
function firstToUpper (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function App () {
  return (
    <>
      <div className='relative min-h-dvh bg-black'>
        <img
          className='absolute h-full w-full object-cover object-bottom opacity-60'
          src='/src/assets/forestBackground.png'
          alt='Main Menu Image'
        />
        {/* Main Menu */}
        <div className='relative mx-auto flex min-h-dvh w-full items-center justify-center border-2 border-white'>
          <div className='relative w-80 rounded-md border-b-2 border-t-2 border-dashed border-white border-opacity-40 p-2'>
            <h1 className='flex flex-col text-center text-6xl text-slate-700'>
              <span className='drop-shadow-surrounded-blue text-[#FFCC00]'>
                Pokémon
              </span>
              <span className='drop-shadow-surrounded'>Memory Card</span>
            </h1>
            <div className='m-5 ml-8'>
              <button className='group flex items-center text-2xl text-white'>
                <FontAwesomeIcon
                  className='mb-1 opacity-0 duration-150 group-hover:opacity-100'
                  icon={faCaretRight}
                />
                <span className='block text-center transition-all duration-150 ease-out group-hover:translate-x-2'>
                  Start Game
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Game Layout */}
        <div className='relative mx-auto flex min-h-dvh w-full flex-col justify-start gap-5 border-2 border-white'>
          {/* header */}
          <header className='mt-10 flex items-center justify-center border-2 border-sky-500 px-3'>
            <div className='ml-auto flex items-center '>
              <img
                className='h-16 w-16 pb-1 '
                src='/src/assets/pokeball.png'
                alt='Pokeball image'
              />
              <h1 className='drop-shadow-surrounded text-6xl text-slate-700'>
                Memory Card Game
              </h1>
            </div>
            <button className='ml-auto text-4xl text-white'>
              <FontAwesomeIcon className='mt-2' icon={faGear} />
            </button>
          </header>
          {/* Game Body */}
          <div className='auto-column-fr grid min-h-32 place-content-center border-2 border-red-500 p-10'>
            {/* Cards */}
            <div className='group flex w-40 flex-col gap-3 rounded-lg border-2 border-green-600 p-2 backdrop-blur-md transition-all hover:scale-110 hover:shadow-lg hover:shadow-slate-400 '>
              <img
                src={pokemon.sprites.versions['generation-v'].front_default}
                alt={`${pokemon.name} sprite gif`}
              />
              <p className='spacing text-center text-3xl text-white transition-all group-hover:tracking-wide'>
                {firstToUpper(pokemon.name)}
              </p>
            </div>
            <div />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
