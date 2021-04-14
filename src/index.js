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
});

function appendToys(toyObj) {
  let newToyCard = document.createElement("div")
  newToyCard.className = "card"
  toyBox.append(newToyCard)
  


}