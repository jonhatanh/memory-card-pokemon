import { useEffect, useRef } from 'react'

function firstToUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function PokemonCard({ pokemon, handleCardClick, sprite }) {
  return (
    <button
      className='card group relative flex h-64 w-48 flex-col gap-4 overflow-hidden rounded-lg p-2 transition-all'
      onClick={() => handleCardClick(pokemon.id)}
    >
      <div className='card-background backdrop-blur-md' />
      <div className='relative z-10 h-44 w-full'>
        <img
          className='h-full w-full'
          src={pokemon.sprites[sprite]}
          alt={`${pokemon.name} sprite gif`}
        />
      </div>
      <p className='relative w-full text-center text-3xl text-white transition-all group-hover:tracking-wider group-hover:text-black'>
        {firstToUpper(pokemon.name)}
      </p>
    </button>
  )
}
