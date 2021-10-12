const container = document.querySelector(".container");
const startBtn = document.querySelector(".testButton");
const loader = document.querySelector(".loader");

startBtn.addEventListener("click", function () {
  startBtn.style.display = "none";
  loader.style.opacity = "1";
  setTimeout("createNewContent()", 3000);
});

const createNewContent = function () {
  // container.innerHTML = "";
  container.remove();
  // Creating the header
  const newDiv = document.createElement("div");
  newDiv.className = "header";
  //Creating some h2 text inside header
  const newH2El = document.createElement("h2");
  const headerText = document.createTextNode("What should we do today");
  newH2El.appendChild(headerText);
  newDiv.appendChild(newH2El);
  console.log(newDiv);
  // Creating input
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.className = "input";
  newInput.placeholder = "What should we do...";
  newDiv.appendChild(newInput);
  // Creating span element to click
  const span = document.createElement("span");
  const spanText = document.createTextNode("Add");
  span.appendChild(spanText);
  span.className = "addBtn";
  newDiv.appendChild(span);
  // Adding new element
  document.body.appendChild(newDiv);

  // Creating list container
};

console.log("testi");
