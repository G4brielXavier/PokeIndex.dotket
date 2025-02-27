let limitPokemonText = document.querySelector('#totalpokemons_qty')

const convertToPokeClass = (pokemon_detail) => {
    const pokemon = new PokeClass()
    pokemon.name = pokemon_detail.name
    pokemon.id = pokemon_detail.id

    const types = pokemon_detail.types.map((typesSlot) => typesSlot.type.name)

    pokemon.principalType = types[0] 
    pokemon.types = types

    pokemon.icon = pokemon_detail.sprites.front_default

    return pokemon
}


const pokeApiManager = {}

pokeApiManager.getResults = (pokemon) => {
    return fetch(pokemon.url)
        .then((res) => res.json())
        .then(convertToPokeClass)
}


pokeApiManager.getPokemon = (offset=0, limit=100) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then((resp) => resp.json())
        .then((respJson) => {
            limitPokemonText.textContent = `${respJson.count} total pokemons`
            return respJson.results
        })
        .then((pokeResult) => pokeResult.map(pokeApiManager.getResults))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsInfo) => pokemonsInfo)
        .catch((error) => console.log(error))
}

pokeApiManager.getPokemonFromIndex = (index=0) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1500`)
        .then((res) => res.json())
        .then((resJson) => resJson.results)
        .then((pokemonDetails) => pokemonDetails[index])
        .then((pokemonFounded) => pokeApiManager.getResults(pokemonFounded))
        .then((pokemon) => pokemon)
    }