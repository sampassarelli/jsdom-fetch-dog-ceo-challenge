console.log('%c HI', 'color: firebrick')


const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const imageContainer = document.querySelector("div#dog-image-container")
const breedUl = document.querySelector("ul#dog-breeds")
const dropdown = document.querySelector("select#breed-dropdown")

////////// GET Fetch Request for Dog Images //////////
function fetchDogImages (){
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(dogImages => {
        dogImages.message.forEach(dogImage => createDogImages(dogImage))
    })
}

////////// Load Dog Images //////////
function createDogImages(dogImage){
    const ul = document.createElement("ul")
    const li = document.createElement("li")
    const img = document.createElement("img")
    img.src = dogImage

    li.append(img)
    ul.append(li)
    imageContainer.append(ul)
}

////////// Initializations //////////
fetchDogImages()
fetchDogBreeds()


////////// GET Fetch Request for Dog Breeds //////////
function fetchDogBreeds(){
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(dogBreeds => {
        const breedsArray = Object.keys(dogBreeds.message)
        breedsArray.forEach(dogBreed => createDogBreedList(dogBreed))
    })
}

///////// Load Dog Breed List //////////
function createDogBreedList(dogBreed){
    const breedLi = document.createElement("li")
    breedLi.textContent = dogBreed

    breedUl.append(breedLi)
}

////////// Event Listener for Color Change Click //////////
breedUl.addEventListener("click", breedColorChange)

function breedColorChange(e){
    if (e.target.tagName === "LI"){
        const breed = e.target
        if (breed.style.color === "red"){
            breed.style.color = "black"
        } else{
            breed.style.color = "red"
        }
    }
}

////////// Add Event listener for the change in the letter of the dropdown /////////
dropdown.addEventListener("change", filterBreeds)

////////// function to only show filtered dog breeds //////////
function filterBreeds(e){
    const breedLetter = e.target.value //or dropdown.value
    const breedLis = breedUl.querySelectorAll("li")

    breedLis.forEach(li => {
        if (li.textContent.startsWith(breedLetter)){
            //show it
            li.style.display = ""
        } else {
            //hide it 
            li.style.display = "none"
        }
    });
}