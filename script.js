const itemForm = document.getElementById("item-form")
const itemInput = document.getElementById("item-input")
const itemList = document.getElementById("item-list")
const clearButton = document.getElementById("clear")
const filter = document.getElementById("filter")
const items = document.querySelectorAll("li")
const formButton = itemForm.querySelector('button')
let isEditMode = false

function displayItems(){
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach(item => addItemToDOM(item))
    checkUI()
}

function addItem(e){
    e.preventDefault()
    const item = itemInput.value
    if(item === ""){
        alert('Please fill the form')
        return
    }

    if(isEditMode){
       const itemToEdit = itemList.querySelector('.edit-mode') 
       itemToEdit.classList.remove('edit-mode')
       removeItemFromStorage(itemToEdit.textContent)
       itemToEdit.remove()
       isEditMode = false
    }

    addItemToDOM(item)
    addItemToStorage(item)
    checkUI()
    itemInput.value = ''
}

function addItemToDOM(item){
    const list = document.createElement('li')
    list.innerText = item
    const button = createNewButton('remove-item btn-link text-red')
    list.appendChild(button)
    itemList.appendChild(list)
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

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage()

    itemsFromStorage.push(item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage(){
    let itemsFromStorage
    if(localStorage.getItem('items') === null){
        itemsFromStorage = []
    } else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    return itemsFromStorage
}

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target)
    }

}

function setItemToEdit(item){
    isEditMode = true
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'))
    item.classList.add('edit-mode')
    formButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    formButton.style.backgroundColor = 'red'
    itemInput.value = item.textContent

}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage()
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))

}

function removeItem(item){
    if(confirm(`Are you sure you want to delete ${item.textContent}`)){
        item.remove()
        removeItemFromStorage(item.textContent)

        checkUI()
    }
}

function removeAllItems(e){
    if(confirm(`Are you sure you want to delete all items`)){
        while(itemList.childElementCount > 0){
            itemList.lastChild.remove()
        }
        checkUI()
    }
}

function filtero(e) {  
    const items = document.querySelectorAll("li")
    items.forEach(element => {
        if(element.innerText.toLowerCase().includes(e.target.value.toLowerCase())){
            element.style.display = 'flex'
        } else{
            element.style.display = 'none'
        }
        console.log(element.innerText.toLowerCase())
        
    })
    console.log(e.target.value)
}

function checkUI(){
    const items = document.querySelectorAll("li")    
    if(items.length === 0){
        clearButton.style.display = 'none'
        filter.style.display = 'none'
    } else{
        clearButton.style.display = 'block'
        filter.style.display = 'block'

    }

    formButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add item'
    formButton.style.backgroundColor = '#333'

    isEditMode = false
}

function init(){
itemForm.addEventListener('submit', addItem )
itemList.addEventListener('click', onClickItem)
clearButton.addEventListener('click', removeAllItems)
filter.addEventListener('keyup', filtero)
document.addEventListener('DOMContentLoaded', displayItems)

checkUI()
}

init()
