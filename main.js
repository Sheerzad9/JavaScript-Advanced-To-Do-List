const container = document.querySelector(".container");
const startBtn = document.querySelector(".testButton");
const loader = document.querySelector(".loader");

const kuukaudet = [
  "tammikuuta",
  "helmikuuta",
  "maaliskuuta",
  "huhtikuuta",
  "toukokuuta",
  "kesäkuuta",
  "heinäkuuta",
  "elokuuta",
  "syyskuuta",
  "lokakuuta",
  "marraskuuta",
  "joulukuuta",
];

const viikonPaivat = [
  "maanantai",
  "tiistai",
  "keskiviikko",
  "torstai",
  "perjantai",
  "lauantai",
  "sunnuntai",
];
// console.log(kuukaudet[current_date.getMonth()]);

startBtn.addEventListener("click", function () {
  startBtn.style.display = "none";
  loader.style.opacity = "1";
  setTimeout("createNewContent()", 3000);
});

let addBtn;

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
  // Creating input
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.className = "input";
  newInput.placeholder = "What should we do...";
  newDiv.appendChild(newInput);
  // Creating span element to click
  addBtn = document.createElement("span");
  const spanText = document.createTextNode("Add");
  addBtn.appendChild(spanText);
  addBtn.className = "addBtn";
  newDiv.appendChild(addBtn);
  console.log(newDiv);
  // Adding new element
  document.body.appendChild(newDiv);

  // Creating list container
  const ulContainer = document.createElement("ul");
  ulContainer.className = "ulContainer";

  const testli = document.createElement("li");
  testli.innerHTML = "Go to cabin";

  ulContainer.appendChild(testli);
  console.log(ulContainer);
  newDiv.insertAdjacentElement("afterend", ulContainer);
};

document.addEventListener("click", addFunc);

function addFunc(e) {
  if (e.target.className === "addBtn") {
    const inputti = document.querySelector(".input");
    const ulContainer = document.querySelector(".ulContainer");

    if (inputti.value.length > 2 && inputti.value.match(/^[0-9]+$/) === null) {
      const currentDate = new Date();
      const markup = `<li><h4>${
        inputti.value
      }</h4> <br> <p class = "time"> lisätty: ${
        viikonPaivat[currentDate.getDay()]
      }, ${currentDate.getDate()}.${
        kuukaudet[currentDate.getMonth()]
      }.${currentDate.getFullYear()} <br> klo: ${currentDate.getHours()}.${
        currentDate.getMinutes().length === 1
          ? "0" + currentDate.getMinutes()
          : currentDate.getMinutes()
      } </p> </li>`;

      ulContainer.insertAdjacentHTML("afterbegin", markup);
    }
    if (inputti.value.length <= 2) {
      alert("Too short, should contain more than 2 letters");
    }
    if (inputti.value.match(/^[0-9]+$/) != null)
      alert(`You can't insert only numbers!`);
  }
}

console.log(typeof 0220);
