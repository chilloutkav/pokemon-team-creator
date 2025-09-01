//Declare Global Variables

let url = "https://pokeapi.co/api/v2/pokemon/";
const pokeName = document.querySelector(".pokemon-name");
const pokeSprite = document.querySelector(".pokemon-sprite");
const pokeType = document.querySelector(".pokemon-type");
const dexNumber = document.querySelector(".dexNumber");
const addPoke = document.querySelector(".add-team")
const yourTeam = document.querySelector(".your-team")
const form = document.querySelector(".form")
const moveContainer = document.querySelector(".move-container ul")
const pokemonDisplay = document.querySelector("#pokemon-display")
const randomBtn = document.querySelector("#random-btn")
let teamCount = 0

function resetAddButton() {
    if (teamCount < 6) {
        addPoke.textContent = "Add to Team!"
        addPoke.disabled = false
        addPoke.className = "bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg py-3 px-8 transition-colors"
    }
}

setInterval(resetAddButton, 100)

// Random Pokemon button functionality
randomBtn.addEventListener("click", () => {
    moveContainer.innerHTML = ""
    const randomId = Math.floor(Math.random() * 1010) + 1 // Pokemon IDs go from 1 to 1010
    
    fetch(url + randomId)
    .then((res) => {
        if (!res.ok) throw new Error('Pokemon not found')
        return res.json()
    })
    .then((data) => {
        displayPokeCard(data)
        pokemonDisplay.classList.remove('hidden')
        // Clear the search input when showing random Pokemon
        document.getElementById('new-name').value = ''
    })
    .catch((error) => {
        // If random Pokemon fails, try another one
        randomBtn.click()
    })
})


form.addEventListener("submit", (e) => {
    e.preventDefault()
    moveContainer.innerHTML = ""
    let searchName = e.target.name.value.toLowerCase().trim()
    if (!searchName) return
    
    fetch(url + searchName)
    .then((res) => {
        if (!res.ok) throw new Error('Pokemon not found')
        return res.json()
    })
    .then((data) => {
        displayPokeCard(data)
        pokemonDisplay.classList.remove('hidden')
    })
    .catch((error) => {
        alert('Pokemon not found! Please try a different name or number.')
        pokemonDisplay.classList.add('hidden')
    })
})


//Display Pokemon Details in pokemon-card
function displayPokeCard(data) {
    pokeName.textContent = data.name    
    pokeSprite.src = data.sprites.front_default
    pokeType.textContent = data.types.map(type => type.type.name).join(', ')
    dexNumber.textContent = `#${data.id.toString().padStart(3, '0')}`
    
    const movesToShow = Math.min(4, data.moves.length)
    for(let i = 0; i < movesToShow; i++) {
        let moveName = document.createElement("li")
        moveName.innerText = data.moves[i].move.name.replace('-', ' ')
        moveName.className = "text-center py-1"
        moveContainer.append(moveName)
    }
    
    pokeSprite.removeEventListener("mouseover", showShiny)
    pokeSprite.removeEventListener("mouseout", showNormal)
    pokeSprite.addEventListener("mouseover", showShiny)
    pokeSprite.addEventListener("mouseout", showNormal)
    
    function showShiny() {
        if (data.sprites.front_shiny) {
            pokeSprite.src = data.sprites.front_shiny
        }
    }
    
    function showNormal() {
        pokeSprite.src = data.sprites.front_default
    }
}

//To iterate over for moves -> data.moves[0].move.name

//Add to team button
addPoke.addEventListener("click", (e) => {
    if(teamCount < 6 && pokeName.textContent !== 'Pokémon Name') {
        let teamCard = document.createElement("div")
        teamCard.className = "bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
        
        let teamName = document.createElement("h3")
        let teamImg = document.createElement("img")
        let teamType = document.createElement("p")
        let teamNumber = document.createElement("p")
        let removeBtn = document.createElement("button")
        
        teamName.textContent = pokeName.textContent
        teamName.className = "text-lg font-bold text-gray-800 mb-2 capitalize"
        
        teamImg.src = pokeSprite.src
        teamImg.className = "w-20 h-20 mx-auto mb-2"
        teamImg.alt = pokeName.textContent
        
        teamType.textContent = pokeType.textContent
        teamType.className = "text-sm text-gray-600 capitalize mb-1"
        
        teamNumber.textContent = dexNumber.textContent
        teamNumber.className = "text-xs text-gray-500 mb-2"
        
        removeBtn.textContent = "Remove"
        removeBtn.className = "bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition-colors"
        removeBtn.addEventListener("click", () => {
            teamCard.remove()
            teamCount--
        })
        
        teamCard.append(teamName, teamImg, teamType, teamNumber, removeBtn)
        yourTeam.append(teamCard)
        teamCount++
        
        if (teamCount === 6) {
            addPoke.textContent = "Team Full!"
            addPoke.disabled = true
            addPoke.className = "bg-gray-400 text-white font-medium rounded-lg py-3 px-8 cursor-not-allowed"
        }
    }
})

