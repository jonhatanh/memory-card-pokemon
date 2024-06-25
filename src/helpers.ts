import { PokemonApi, PokemonList } from "./constans"

export function randomBoolean () {
  return !Math.floor(Math.random() * 2)
}

export function getMessage (score: number, total: number): string {
  let message = ''
  const percentage = (score / total) * 100

  if (percentage >= 70) {
    message = "You're almost there!"
  } else if (percentage >= 50) {
    message = 'Not bad, keep going!'
  } else {
    message = randomBoolean() ? 'You can do better!' : 'Are you even trying?'
  }
  return message
}

export function shuffleCards (list: PokemonList) {
  const newOrder: PokemonList = []
  const cardsAux = [...list]
  while (cardsAux.length !== 0) {
    const randomIndex = Math.floor(Math.random() * cardsAux.length)
    newOrder.push(cardsAux[randomIndex])
    cardsAux.splice(randomIndex, 1)
  }
  return newOrder
}

export function getRandomNumbersInRange (qtyNumbers: number, min = 0, max = 649) {
  const array = []
  for (let i = 0; i < qtyNumbers;) {
    const randomNumber = Math.floor(Math.random() * (max + 1) + min)
    if (array.indexOf(randomNumber) !== -1) continue
    array.push(randomNumber)
    i++
  }
  return array
}

export async function getRandomPokemons (quantity: number): Promise<PokemonList> {
  const pokeIds = getRandomNumbersInRange(quantity)
  const pokePromises = pokeIds.map((id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  )

  const responses = await Promise.all(pokePromises);
  const jsonPromises = responses.map((res) => res.json() as Promise<PokemonApi>);
  const newPokemons = await Promise.all(jsonPromises);

  return newPokemons.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprites: {
        normal: pokemon.sprites.versions['generation-v']['black-white'].front_default,
        animated: pokemon.sprites.versions['generation-v']['black-white'].animated.front_default
      }
    }
  })
}
