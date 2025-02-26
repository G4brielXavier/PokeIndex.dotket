
const convertToLi = (pokemon) => {
    return `
        <li class="pokemon_child -${pokemon.principalType}">
            <span id="index">#${pokemon.id}</span>
            <div id="boxImage">
                <img src="${pokemon.icon}" alt="icon_${pokemon.name}">
            </div>
        </li>
    `
}


let parentPokedex = document.querySelector(".content_pokedex")

let inputOffSet = document.querySelector('#offset_pokemon')
let inputLimit = document.querySelector('#limit_pokemon')

let qtyPokemon = document.querySelector("#pokemons_qty")


document.querySelector('#btn_apply').addEventListener('click', (e) => {
    pokeApiManager.getPokemon(inputOffSet.value, inputLimit.value).then((pokemons) => {
        parentPokedex.innerHTML = ""

        qtyPokemon.innerHTML = `${pokemons.length} Pokemons Searched` 
        const myLi = pokemons.map(convertToLi).join('')
        parentPokedex.innerHTML += myLi
    })

    e.preventDefault()
})


document.addEventListener('DOMContentLoaded', () => {
    pokeApiManager.getPokemon(inputOffSet.value, inputLimit.value).then((pokemons) => {
        parentPokedex.innerHTML = ""

        qtyPokemon.innerHTML = `${pokemons.length} Pokemons Searched` 
        const myLi = pokemons.map(convertToLi).join('')
        parentPokedex.innerHTML += myLi
    })

    e.preventDefault()
})