import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import PokemonCard from './PokemonCard'
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


export default function GameLayout () {
  const [pokemons, setPokemons] = useState(() => {
    const pokemons = []
    for (let i = 0; i < 10; i++) {
      pokemons.push({ ...pokemon, id: i, name: pokemon.name + i })
    }
    console.log(pokemons);
    return pokemons
  })
  return (
    <div className='relative mx-auto flex min-h-dvh w-full flex-col justify-start gap-5 border-2 border-white'>
      {/* header */}
      <header className='mt-10 flex items-center justify-center border-2 border-sky-500 px-3'>
        <div className='ml-auto flex items-center '>
          <img
            className='h-16 w-16 pb-1 '
            src='/src/assets/pokeball.png'
            alt='Pokeball image'
          />
          <h1 className='text-6xl text-slate-700 drop-shadow-surrounded text-center'>
            Memory Card Game
          </h1>
        </div>
        <button className='ml-auto text-4xl text-white'>
          <FontAwesomeIcon className='mt-2' icon={faGear} />
        </button>
      </header>
      {/* Game Body */}
      <div className='flex flex-wrap justify-center gap-8 items-center min-h-32 outline outline-1 outline-red-500 py-10 px-5 xl:max-w-screen-xl mx-auto'>
        {/* Cards */}
        {
          pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
        }
      </div>
    </div>
  )
}
