let view_icon = document.querySelector('#view_icon_pokemon')
let view_name = document.querySelector("#pokemon_name_view")

let modal_main = document.querySelector(".modal_pokemon_quickdetail_closed")

var modalOpen = false

function updateModalStatus()
{
    if (modalOpen)
    {
        modal_main.classList.add('modal_pokemon_quickdetail')
        modal_main.classList.remove('modal_pokemon_quickdetail_closed')
    }
    else
    {
        modal_main.classList.remove('modal_pokemon_quickdetail')
        modal_main.classList.add('modal_pokemon_quickdetail_closed')
    }
}

function showDetail(e) {
    let index_pokemon = e.getAttribute("key")

    pokeApiManager.getPokemonFromIndex(index_pokemon-1)
    .then((pokemon_founded) => {
        view_icon.src = pokemon_founded.icon
        view_name.textContent = pokemon_founded.name

        modalOpen = !modalOpen
        updateModalStatus()
    })
}

modal_main.addEventListener('click', () => {
    modalOpen = !modalOpen
    updateModalStatus()
})