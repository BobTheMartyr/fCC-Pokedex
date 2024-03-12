const weight = document.getElementById('weight')
const height = document.getElementById('height')
const types = document.getElementById('types')
const input = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const pokeName = document.getElementById('pokemon-name')
const pokeID = document.getElementById('pokemon-id')
const spriteContainer = document.getElementById('pokemon-sprite')
const statsTable = document.getElementById('stats-table')
const typesDiv = document.getElementById('types')
const screen = document.getElementById('pokedex-screen')
const hp = document.getElementById('hp')
// holy shit
const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/`
let newURL = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/`


searchBtn.addEventListener('click', () => {
  fetchData(input.value.toLowerCase())
})

const fetchData = async (val) => {
  try{
    const res = await fetch(newURL += val)
    const data = await res.json()
    ingestData(data)
    newURL = url
  } catch(err) {
    alert('Pokémon not found')
    newURL = url
  }
}

const ingestData = (data) => {
  screen.style.backgroundColor = '#457B9D'
  statsTable.style.display = 'block'
  spriteContainer.innerHTML = `<img id='sprite' src=${data.sprites.front_default} style='height:300px; width:300px;' />`
  pokeName.innerText = data.name[0].toUpperCase() + data.name.slice(1)
  pokeID.innerText = `#${data.id}`
  weight.innerText = `Weight: ${data.weight}`
  height.innerText = `Height: ${data.height}`
  for( let i = 0; i < data.stats.length; i++ ){
    let cell = document.getElementById(`${data.stats[i].stat.name}`)
    cell.innerText = `${data.stats[i].base_stat}`
  }
  typesDiv.innerHTML = ''
  for( let i = 0; i < data.types.length; i++ ){
    typesDiv.innerHTML += `<span class='type ${data.types[i].type.name}'>${data.types[i].type.name[0].toUpperCase() + data.types[i].type.name.slice(1)}</span>`
  }
}

