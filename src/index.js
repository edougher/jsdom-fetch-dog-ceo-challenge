//console.log('%c HI', 'color: firebrick')
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
let allbreeds = []

document.addEventListener('DOMContentLoaded', function () {
     getDogImages()
     getBreeds()
     breedDropDownListener()
});

function getDogImages() {
   fetch(imgUrl)
  .then(resp => resp.json())
  .then(json => addImage(json)); 
}


function addImage(images) {
      images.message.forEach(element => {
           createImgElements(element)
      });
}
      
function createImgElements(image) {
     const imgContaniner = document.querySelector('#dog-image-container')
     const newTag = document.createElement('img')
     newTag.src = `${image}`
     imgContaniner.appendChild(newTag)
       
  }

  function getBreeds() {
       fetch(breedUrl)
       .then(resp => resp.json())
       .then(json => createBreeds(json));
  }

  function createBreeds(json) {
     breeds = Object.keys(json.message);
     breeds.forEach(breed => createBreedElements(breed))
     allbreeds = breeds
     
  }

  function updateBreedList(breeds) {
     let ul = document.querySelector('#dog-breeds');
     removeChildren(ul);
     breeds.forEach(breed => createBreedElements(breed));
   }

  function createBreedElements(breed) {
     const ul = document.querySelector('#dog-breeds')
     const li = document.createElement('li')
     li.innerHTML = breed
     ul.appendChild(li)
     li.addEventListener('click', liColorChange)
  }

  function liColorChange(e) {
     e.target.style.color = "red"
  }

  function breedDropDownListener() {
       const breedDropDown = document.querySelector('#breed-dropdown')
       breedDropDown.addEventListener('change', function(event) {
            //console.log(event.target.value)
          selectBreedFilter(event.target.value);
       })
  }
   
  function selectBreedFilter(startingLetter) {
     updateBreedList(allbreeds.filter(breed => breed.startsWith(startingLetter)))
}

  function removeChildren(element) {
     let child = element.lastElementChild;
     while (child) {
       element.removeChild(child);
       child = element.lastElementChild;
     }
   }