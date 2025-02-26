
const convertToPokeClass = (pokemon_detail) => {
    const pokemon = new PokeClass()
    pokemon.name = pokemon_detail.name
    pokemon.id = pokemon_detail.id

    const types = pokemon_detail.types.map((typesSlot) => typesSlot.type.name)

    pokemon.principalType = types[0] 
    pokemon.types = types

    pokemon.icon = pokemon_detail.sprites.other.dream_world.front_default

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
        .then((respJson) => respJson.results)
        .then((pokeResult) => pokeResult.map(pokeApiManager.getResults))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsInfo) => pokemonsInfo)
        .catch((error) => console.log(error))
}