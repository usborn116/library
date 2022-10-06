//initial declarations

let myLibrary = []

const element = document.getElementById('books');

const openButton = document.getElementById('open-form');

openButton.addEventListener('click', toggleModal);

form = document.getElementById("Form")

//constructor
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`)
    }
}

//helper functions
function addBookToLibrary(book) {
    myLibrary.push(book)
}

function toggleModal() {
    const modalDiv = document.querySelector('.modalBody');
    modalDiv.classList.toggle('show');
  }

//form function
form.addEventListener("submit", (event) => {
    event.preventDefault()
    let formValue = event.target.elements

    newBook =  new Book(
        formValue.title.value,
        formValue.author.value,
        formValue.pages.value,
        formValue.read.checked
    )

    // Pushes Obj to library array.
    myLibrary.push(newBook)
    // Renders new book on Submission.
    render(newBook)
    // Reset the form fields after submission.
    form.reset()
    toggleModal()
    window.localStorage.clear()
    window.localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    return false
})

//adding book to the visible library
const render = (book) => {
    // Create Buttons to delete book and for read toggle.
    let removeBookBtn = document.createElement("button")
    let btnNode = document.createElement("button")
    removeBookBtn.innerText = "Remove"

    // Create container to separate each book entry.
    let bookContainerDiv = document.createElement("div")

    // Add a Class for styling in CSS and Eventlistener handling.
    bookContainerDiv.classList.add("bookContainer")
    removeBookBtn.classList.add("deleteBookBtn")
    removeBookBtn.setAttribute("type", "button")

    // Append the Div to the Initial Container.
    element.appendChild(bookContainerDiv)

    // Look through the book information entered to display details.
    for (const [key, value] of Object.entries(book)) {
        // Create a P tag for every detail and append to page.
        let pNode = document.createElement("p")

        // Logic for displaying book information to screen.
        if(key === "pages") {
            pNode.innerHTML = `Number of Pages: ` + value
            pNode.classList.add("numPages")
        } else if(key === "read") {

            if(value === true) {
                btnNode.innerHTML = "Read: Yes"
                btnNode.style.backgroundColor = "limegreen"
            } else {
                btnNode.innerHTML = "Read: No"
                btnNode.style.backgroundColor = "Red"
            }

        } else if(key === "author"){
            pNode.innerHTML = `by ${value}`
            pNode.classList.add("bookAuthor")
        } else if(key === 'title') {
            pNode.innerHTML = value
            pNode.classList.add("bookTitle")
        }

        pNode.classList.add("bookDetail")
        btnNode.classList.add("readBtn")
        btnNode.setAttribute("type", "button")
        bookContainerDiv.append(pNode)
        bookContainerDiv.append(btnNode)
    }
    bookContainerDiv.appendChild(removeBookBtn)

    // Parse the LocalStorage in preparations to remove any books.
    let localDB = JSON.parse(localStorage.getItem("myLibrary"))

    removeBookBtn.addEventListener("click", () => {
        // Loop through the myLibrary array until finding book to remove on screen and within the array.
        myLibrary.map((value, index) => {
            let authorElement = bookContainerDiv.childNodes[1].innerHTML.slice(3)
            if(myLibrary[index].author === authorElement) {
                myLibrary.splice(index, 1)
                localDB.splice(index, 1)
                bookContainerDiv.remove()
                // Stringify the localstorage before readding it.
                tempLibrary = JSON.stringify(localDB)
                localStorage.setItem("myLibrary", tempLibrary)
            }
            
        })

        
    })

    // EventHandler to toggle the read button.
    btnNode.addEventListener("click", () => {
        if(btnNode.innerHTML.split(" ")[1] === "Yes") {
            btnNode.style.backgroundColor = "Red"
            btnNode.innerText = "Read: No"
        } else {
            btnNode.style.backgroundColor = "limegreen"
            btnNode.innerText = "Read: Yes"
        }
    })
}

//author validation

const ayo = document.querySelector('.author');
const emailError = document.querySelector(".error");

author.addEventListener('input', (event) => {
    if (author.validity.valid) {
        emailError.textContent = ''
    } else {
        showError();
    }
});

function showError() {
    if (author.validity.tooShort) {
        emailError.textContent = "Author name should be at least 7 characters long."
    }
}
