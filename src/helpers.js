export function randomBoolean () {
  return !Math.floor(Math.random() * 2)
}

export function getMessage (score, total) {
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

export function shuffleCards (list) {
  const newOrder = []
  const cardsAux = [...list]
  while (cardsAux.length !== 0) {
    const randomIndex = Math.floor(Math.random() * cardsAux.length)
    newOrder.push(cardsAux[randomIndex])
    cardsAux.splice(randomIndex, 1)
  }
  return newOrder
}

export function getRandomNumbersInRange (qtyNumbers, min = 0, max = 649) {
  const array = []
  for (let i = 0; i < qtyNumbers;) {
    const randomNumber = Math.floor(Math.random() * (max + 1) + min)
    if (array.indexOf(randomNumber) !== -1) continue
    array.push(randomNumber)
    i++
  }
  return array
}

export function getRandomPokemons (quantity) {
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
