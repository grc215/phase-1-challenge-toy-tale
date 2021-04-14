let addToy = false;
let toyBox = document.querySelector("#toy-collection")
let form = document.querySelector(".add-toy-form")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  //let toyBox = document.querySelector("#toy-collection")
  //console.log(document.querySelector("#toy-collection"))

  fetch("http://localhost:3000/toys/")
    .then(res => res.json())
    .then((toysArray) => {
      toysArray.forEach( function(toyObj) {
        appendToys(toyObj)
      })
    })

  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


function appendToys(toyObj) {
  let newToyCard = document.createElement("div")
  newToyCard.className = "card"
  let toyNameHeader = document.createElement("h2")
  toyNameHeader.innerText = toyObj.name
  let toyImg = document.createElement("img")
  toyImg.src = toyObj.image
  let toyLikesP = document.createElement("p")
  toyLikesP.innerText = toyObj.likes + " likes"
  let likeButton = document.createElement("button")
  likeButton.innerText = "Like"
  likeButton.className = "like-btn"
  likeButton.id = toyObj.id
  
  toyImg.className = "toy-avatar"

  newToyCard.append(toyNameHeader, toyImg, toyLikesP, likeButton)

  toyBox.append(newToyCard)

  likeButton.addEventListener("click", function(evt){
  
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
        method: "PATCH", 
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            likes: toyObj.likes += 1
        })
    })
    .then(res => res.json())
    .then((updatedToyObj) => {
        toyLikesP.innerText = updatedToyObj.likes + " likes"
        toyObj.likes = updatedToyObj.likes
      })
  })

}

form.addEventListener("submit", function(evt){
  evt.preventDefault()
  let whatUserTypedName = evt.target.name.value
  let whatUserTypedImage = evt.target.image.value

  fetch("http://localhost:3000/toys", {
      method: "POST", 
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify({
          name: whatUserTypedName,
          image: whatUserTypedImage,
          likes: 1
      })
  })
  .then(res => res.json())
  .then((newlyCreatedToyObj) => {
      appendToys(newlyCreatedToyObj)
    })
})


})