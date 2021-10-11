const container = document.querySelector(".container")
const startBtn = document.querySelector(".testButton")

startBtn.addEventListener('click', function(){
    container.innerHTML = ''
    // Creating the header
    const newDiv = document.createElement('div')
    newDiv.className = "header";
    //Creating some h2 text inside header
    const newH2El = document.createElement('h2')
    const headerText = document.createTextNode('To Do List')
    newH2El.appendChild(headerText)
    newDiv.appendChild(newH2El)
    console.log(newDiv);
    // Creating input
    const newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.className = 'myInput'
    newInput.placeholder = 'Title...'

    // Adding new element to container
    container.appendChild(newDiv);
    container.appendChild(newInput)

})

console.log("testi");
