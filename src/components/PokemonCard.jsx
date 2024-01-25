function firstToUpper (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function PokemonCard ({ pokemon }) {
  return (
    <div className='group card-gradient flex h-64 w-48 flex-col gap-4 rounded-lg p-2 outline outline-1 outline-green-500 backdrop-blur-md transition-all hover:scale-110 hover:shadow-lg hover:shadow-slate-400 '>
      <div className='h-44 w-full outline outline-1 outline-white'>
        <img
          className='h-full w-full'
          src={pokemon.sprites.animated}
          alt={`${pokemon.name} sprite gif`}
        />
      </div>
      <p className='text-center text-3xl text-white transition-all group-hover:tracking-wider'>
        {firstToUpper(pokemon.name)}
      </p>
    </div>
  )
}
