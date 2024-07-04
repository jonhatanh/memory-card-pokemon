import { useEffect, useState } from "react"
import { PokemonList, pokemon } from "../constans"
import { getRandomNumbersInRange } from "../helpers"

export default function usePokemons(totalPokemons: number) {

  const [pokemons, setPokemons] = useState<PokemonList>([])
  // Fetch Pokemons
  useEffect(() => {
    /* Development */
    const pokeArray: PokemonList = []
    const pokeIds = getRandomNumbersInRange(totalPokemons)
    setPokemons([])
    for (let i = 0; i < pokeIds.length; i++) {
      pokeArray.push({
        ...pokemon,
        id: pokeIds[i],
        name: pokemon.name + pokeIds[i]
      })
    }
    setTimeout(() => setPokemons(pokeArray), 1000)
    /* RealAPI */
    // const getPokemons = async () => {
    //   setPokemons([])
    //   const newPokemons = await getRandomPokemons(totalPokemons)
    //   if (!ignore) setPokemons(newPokemons)
    // }
    // let ignore = false
    // getPokemons()
    // return () => {
    //   ignore = true
    // }
  }, [totalPokemons])

  return [pokemons, setPokemons] as const
}