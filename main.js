const container = document.querySelector(".container");
const startBtn = document.querySelector(".testButton");
const loader = document.querySelector(".loader");
let addBtn;

const data = {
  kuukaudet: [
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
  ],
  viikonPaivat: [
    "maanantai",
    "tiistai",
    "keskiviikko",
    "torstai",
    "perjantai",
    "lauantai",
    "sunnuntai",
  ],
  listElements: [],
};

// console.log(kuukaudet[current_date.getMonth()]);

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
  if (localStorage.getItem("lista") !== null) {
    const lista = localStorage.getItem("lista");
    console.log(lista);
    const listatArr = lista.split(",");
    data.listElements.push(lista);
    console.log(listatArr);
    ulContainer.insertAdjacentHTML("afterbegin", lista);
  }
  // var myNodelist = document.getElementsByTagName("li");
  // console.log(myNodelist);
};

document.addEventListener("click", addFunc);

function addFunc(e) {
  if (e.target.className === "addBtn") {
    const inputti = document.querySelector(".input");
    const ulContainer = document.querySelector(".ulContainer");

    if (inputti.value.length > 2 && inputti.value.match(/^[0-9]+$/) === null) {
      const currentDate = new Date();
      const markup = `<li><span class="close">x</span> <h4>${
        inputti.value
      }</h4> <br> <p class = "time"> lisätty: ${
        data.viikonPaivat[currentDate.getDay()]
      }. ${currentDate.getDate()}.${
        data.kuukaudet[currentDate.getMonth()]
      }.${currentDate.getFullYear()} <br> klo: ${currentDate.getHours()}.${
        currentDate.getMinutes().length === 1
          ? "0" + currentDate.getMinutes()
          : currentDate.getMinutes()
      } </p>
       </li>`;

      ulContainer.insertAdjacentHTML("afterbegin", markup);
      data.listElements.push(markup);
      localStorage.setItem("lista", data.listElements);
    }
    if (inputti.value.length <= 2) {
      alert("Too short, should contain more than 2 letters");
    }
    if (inputti.value.match(/^[0-9]+$/) != null)
      alert(`You can't insert only numbers!`);
    inputti.value = "";
  }
}

const deleteFunc = function () {};

const reset = function () {
  localStorage.removeItem("lista");
};
