const container = document.querySelector(".container");
const startBtn = document.querySelector(".testButton");
const loader = document.querySelector(".loader");
let addBtn;

// Some hard coded data that we need for apps functionality
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

startBtn.addEventListener("click", function () {
  startBtn.style.display = "none";
  loader.style.opacity = "1";
  setTimeout("updatePage()", 3000);
});

// As the name says, this function clears previous Dom content and fills it up with new
const updatePage = function () {
  container.remove();
  // Creating the header
  const newDiv = document.createElement("div");
  newDiv.className = "header";
  //Creating some h2 text inside header
  const newH2El = document.createElement("h2");
  const headerText = document.createTextNode("To Do List");
  newH2El.appendChild(headerText);
  newDiv.appendChild(newH2El);
  // Creating input field
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.className = "input";
  newInput.placeholder = "What should we do...";
  newDiv.appendChild(newInput);
  // Creating "Add" span element to click on
  addBtn = document.createElement("span");
  const spanText = document.createTextNode("Add");
  addBtn.appendChild(spanText);
  addBtn.className = "addBtn";
  newDiv.appendChild(addBtn);
  // Adding the whole header with its own inner childs to body
  document.body.appendChild(newDiv);

  // Creating list container
  const ulContainer = document.createElement("ul");
  ulContainer.className = "ulContainer";

  // Creating "Check all" span
  const spanni1 = document.createElement("span");
  spanni1.innerHTML = "Check All";
  spanni1.className = "checkAllSpan";

  // Creating "Uncheck all" span
  const spanni2 = document.createElement("span");
  spanni2.innerHTML = "Uncheck All";
  spanni2.className = "uncheckAllSpan";

  // Creating "Delete all" span
  const spanni3 = document.createElement("span");
  spanni3.innerHTML = "Delete all";
  spanni3.className = "deleteAllSpan";

  ulContainer.appendChild(spanni1);
  ulContainer.appendChild(spanni2);
  ulContainer.appendChild(spanni3);
  newDiv.insertAdjacentElement("afterend", ulContainer);

  // Getting list items from local storage if there is any
  if (localStorage.getItem("lista") !== null) {
    const lista = localStorage.getItem("lista");
    const listatArr = lista.split(",");
    // reversing our array so it will print in correct order, because we are using "afterbegin" in "insertAdjacentHTML" function.
    listatArr.reverse();
    listatArr.forEach((el) => {
      ulContainer.insertAdjacentHTML("afterbegin", el);
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////
// CALLING FUNCTION WHICH DETERMINATES WHICH ELEMNT HAVE BEEN CLICKED
document.addEventListener("click", addFunc);

// This function picks up what element is clicked and calls correct function based on that
function addFunc(e) {
  // If user clicks on voice span
  if (e.target.className === "fa") {
    // Taking the parentElement up
    const x = e.target.parentElement.innerText;
    // Splitting it so we can get the "h4" innerText to our array
    const parsattu = x.split("\n");
    // Calling our speak function with the data we want it to say loud, in this case only the h4 innerHTML
    speak(parsattu[1]);
  }

  // Deleting
  if (e.target.className === "close") {
    deleteParent(e.target);
    updateLocalStorage();
  }

  // Creating checked mark
  if (e.target.tagName === "H4") {
    e.target.classList.toggle("checkOver");
    updateLocalStorage();
  }

  // If user adds something
  if (e.target.className === "addBtn") {
    checkInput();
  }

  // User clicking check all span
  if (e.target.className === "checkAllSpan") {
    addingCheckMarks();
    updateLocalStorage();
  }

  // User clicking uncheck all span
  if (e.target.className === "uncheckAllSpan") {
    removingCheckMarks();
    updateLocalStorage();
  }

  // User clicking delete all span
  if (e.target.className === "deleteAllSpan") {
    deleteAll();
  }
}

///////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS

// Checking input and adding it up to list if everything is correct
const checkInput = function () {
  const inputti = document.querySelector(".input");
  const ulContainer = document.querySelector(".ulContainer");

  if (inputti.value.length > 2 && inputti.value.match(/^[0-9]+$/) === null) {
    const currentDate = new Date();
    const markup = `<li> <span class="close">x</span> <h4>${
      inputti.value
    }</h4><br><i style="font-size:24px" class="fa">&#xf028;</i> <p class = "time"> lisätty: ${
      data.viikonPaivat[currentDate.getDay()]
    }. ${currentDate.getDate()}.${
      data.kuukaudet[currentDate.getMonth()]
    }.${currentDate.getFullYear()} <br> klo: ${currentDate.getHours()}.${
      (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes()
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
};

// Check marking all li elements h4 attribute
const addingCheckMarks = function () {
  const ulContainer = document.querySelector(".ulContainer");
  const items = ulContainer.getElementsByTagName("li");
  for (let i = 0; i < items.length; i++) {
    const el = items[i].children[1].classList.add("checkOver");
  }
};

// Removing all check marks from li elements, h4 attribute
const removingCheckMarks = function () {
  const ulContainer = document.querySelector(".ulContainer");
  const items = ulContainer.getElementsByTagName("li");
  for (let i = 0; i < items.length; i++) {
    const el = items[i].children[1];
    if (el.classList.contains("checkOver")) el.classList.remove("checkOver");
  }
};

// Delete all list items
const deleteAll = function () {
  const ulContainer = document.querySelector(".ulContainer");
  // Changing HTMLCollection to an array
  const items = [].slice.call(ulContainer.getElementsByTagName("li"));
  if (items.length > 0) {
    items.forEach((curEl) => {
      curEl.remove();
    });
    updateLocalStorage();
  }
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

const clearLocalStorage = function () {
  // Checking first if there is the key I am looking for, if so, clearing it
  if (localStorage.getItem("lista") !== null) localStorage.lista = "";
};

/* Maintining the current data of the session by pushing the changes,
  to our hard coded "data.listElements" array and setting it to localStorage,
  after cleaning it up first
*/
const updateLocalStorage = function () {
  clearLocalStorage();
  const ulContainer = document.querySelector(".ulContainer");
  const items = ulContainer.getElementsByTagName("li");
  // Clearing our current array so same data doesnt pile up again and again
  if (data.listElements.length > 0) data.listElements = [];
  for (var i = 0; i < items.length; ++i) {
    data.listElements.push(items[i].outerHTML);
  }
  localStorage.lista = data.listElements;
};
