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
  setTimeout("init()", 3000);
});

const init = function () {
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
  // Adding new element
  document.body.appendChild(newDiv);

  // Creating list container
  const ulContainer = document.createElement("ul");
  ulContainer.className = "ulContainer";

  const spanni1 = document.createElement("span");
  spanni1.innerHTML = "Check All";
  spanni1.className = "checkAllSpan";

  const spanni2 = document.createElement("span");
  spanni2.innerHTML = "Remove All";
  spanni2.className = "removeAllSpan";

  ulContainer.appendChild(spanni1);
  ulContainer.appendChild(spanni2);
  newDiv.insertAdjacentElement("afterend", ulContainer);
  // Getting list items from local storage
  if (localStorage.getItem("lista") !== null) {
    const lista = localStorage.getItem("lista");
    const listatArr = lista.split(",");
    // data.listElements.push(lista);
    // Inserting the list items to the parent ul element
    listatArr.forEach((el) => {
      ulContainer.insertAdjacentHTML("afterbegin", el);
    });
  }
  // var myNodelist = document.getElementsByTagName("li");
  // console.log(myNodelist);
};

// Delete parent element function
const deleteParent = function (el) {
  el.parentElement.remove();
};

// Creating the voice function
const speak = function (msg) {
  const sp = new SpeechSynthesisUtterance(msg);
  speechSynthesis.speak(sp);
};

document.addEventListener("click", addFunc);

function addFunc(e) {
  // If user clicks voice button
  if (e.target.className === "fa") {
    // Taking the parentElement up
    const x = e.target.parentElement.innerText;
    // Splitting it so we can get the "h4" innerText to arr
    const parsattu = x.split("\n");
    console.log(x);
    console.log(parsattu);
    speak(parsattu[1]);
  }

  // Deleting
  if (e.target.className === "close") {
    deleteParent(e.target);
    // reset()
    updateLocalStorage();
  }

  // Creating checked mark
  if (e.target.tagName === "H4") {
    console.log(e.target.classList);
    e.target.classList.toggle("checkOver");
    updateLocalStorage();
  }

  // If user adds something
  if (e.target.className === "addBtn") {
    const inputti = document.querySelector(".input");
    const ulContainer = document.querySelector(".ulContainer");

    if (inputti.value.length > 2 && inputti.value.match(/^[0-9]+$/) === null) {
      const currentDate = new Date();
      const markup = `<li></i> <span class="close">x</span> <h4>${
        inputti.value
      }</h4><br><i style="font-size:24px" class="fa">&#xf028;</i> <p class = "time"> lisätty: ${
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
      updateLocalStorage();
    }
    if (inputti.value.length <= 2) {
      alert("Too short, should contain more than 2 letters");
    }
    if (inputti.value.match(/^[0-9]+$/) != null)
      alert(`You can't insert only numbers!`);
    inputti.value = "";
  }
}

const clearLocalStorage = function () {
  localStorage.removeItem("lista");
};

const updateLocalStorage = function () {
  clearLocalStorage();
  const ulContainer = document.querySelector(".ulContainer");
  const items = ulContainer.getElementsByTagName("li");
  if (data.listElements.length > 0) data.listElements = [];
  for (var i = 0; i < items.length; ++i) {
    data.listElements.push(items[i].outerHTML);
  }
  localStorage.setItem("lista", data.listElements);
  console.log(data.listElements);
};

// data.listElements.push(items[i]);
