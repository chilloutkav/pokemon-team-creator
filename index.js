//Declare Global Variables

let url = "https://pokeapi.co/api/v2/pokemon/";
const pokeName = document.querySelector(".pokemon-name");
const pokeSprite = document.querySelector(".pokemon-sprite");
const pokeType = document.querySelector(".pokemon-type");
const dexNumber = document.querySelector(".dexNumber");
const addPoke = document.querySelector(".add-team")
const yourTeam = document.querySelector(".your-team")
const form = document.querySelector(".form")
const moveContainer = document.querySelector(".move-container")
let teamCount = 0


form.addEventListener("submit", (e) => {
    e.preventDefault()
    moveContainer.textContent = ""
//Capture target value of submit and save to variable
    let searchName = e.target.name.value.toLowerCase()
    fetch(url + searchName)
    .then((res) => res.json())
    .then((data) => displayPokeCard(data))
    // console.log(searchName);
//Concatenate variable to url
//fetchURL w/ displayPokeCard
})


//Display Pokemon Details in pokemon-card
function displayPokeCard(data) {
    pokeName.textContent = data.name    
    pokeSprite.src = data.sprites.front_default
    pokeType.textContent = data.types[0].type.name
    dexNumber.textContent = `No. ${data.id}`
    for(let i = 0; i < 4; i++) {
    let moveName = document.createElement("li")
    moveName.innerText = data.moves[i].move.name
    moveContainer.append(moveName)
    }
    pokeSprite.addEventListener("mouseover", (e) => {
        pokeSprite.src = data.sprites.front_shiny
    })
    pokeSprite.addEventListener("mouseout", (e) => {
        pokeSprite.src = data.sprites.front_default
    })
}

//To iterate over for moves -> data.moves[0].move.name

//Add to team button
addPoke.addEventListener("click", (e) => {
//Duplicate and append to Your Team Div
    if(teamCount < 6) {
    let teamName = document.createElement("h1")
    let teamImg = document.createElement("img")
    let teamType = document.createElement("h2")
    let teamNumber = document.createElement("h4")
    teamName.textContent = pokeName.textContent
    teamName.className = "flex justify-center capitalize"
    teamImg.src = pokeSprite.src
    teamType.textContent = pokeType.textContent
    teamType.className = "flex justify-center capitalize"
    teamNumber.textContent = dexNumber.textContent
    teamNumber.className = "flex justify-center capitalize"
    yourTeam.append(teamName, teamImg, teamType, teamNumber)
    teamCount += 1
    }
})

