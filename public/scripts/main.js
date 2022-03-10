import Modal from "./modal.js"

const modal = Modal()

const deleteButtons = document.querySelectorAll(".actions a.delete")

// opens modal when clicking to remove a question
deleteButtons.forEach(button => {
    button.addEventListener("click", event => {handleClick(event, false)})
    
})


// closes the modal once it's open
document.getElementById("close-modal").addEventListener("click", event => {modal.close()})


// Make another modal for the checkmark button lmao
const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector(".modal p")
const modalActionButton = document.querySelector(".modal .buttons button")



const checkButtons = document.querySelectorAll(".actions .check")
checkButtons.forEach(button => {
    button.addEventListener("click", event => {handleClick(event, true)})
})

function handleClick(event, check = true){
    const roomId = document.querySelector("#room-id").dataset.id
    const form = document.querySelector(".modal .modal-form")
    const slug = check ? "read" : "delete"
    const questionId = event.target.dataset.id
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    

    modalActionButton.className = check ? "button" : "red"
    modalTitle.innerHTML = check ? "Marcar como lida" : "Excluir pergunta"
    modalDescription.innerHTML = check ? "Quer mesmo marcar pergunta como lida?" : "Tem certeza que você deseja excluir essa pergunta?"
    modalActionButton.innerHTML = check ? "Confirmar" : "Sim, excluir"

    modal.open()


}