const itemForm = document.getElementById("item-form")
const itemInput = document.getElementById("item-input")
const itemList = document.getElementById("item-list")


function addItem(e){
    e.preventDefault()
    const item = itemInput.value
    if(item === ""){
        alert('Please fill the form')
        return
    }
    button = createNewButton('remove-item btn-link text-red')
    const list = document.createElement('li')
    list.innerText = item
    list.appendChild(button)
    itemList.appendChild(list)
    itemInput.value = ''
}

function createNewButton(classes){
    const button = document.createElement('button')
    button.className = classes
    icon = createNewIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button
}

function createNewIcon(classes){
    const icon = document.createElement("i")
    icon.className = classes    
    return icon
}

itemForm.addEventListener('submit', addItem )