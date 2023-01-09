const addTaskBtn = document.querySelector('#addTaskBtn')
const containerOfUserInput = document.querySelector('.containerOfUserInput')
const userInputLayer = document.querySelector('.inputLayer')
const cancelTag = document.querySelector('#cancelTag')
const taskNameInputTag = document.querySelector('.taskName')


let taskId = 0,
  containerArray = [],
  noTaskArray = [{ taskName: 'Nothing To Do...!', taskId: 'ntd', description: 'this is something Desc' }],
  taskObj,
  jsonConvertedArray,
  dataFromLocalStorage,
  arrayConvertedJson



window.addEventListener('load', () => {
  try {
    createTaskFn()
    const finalTaskID = arrayConvertedJson[arrayConvertedJson.length - 1].taskId
    taskId = finalTaskID + 1
  } catch {
    document.getElementById('ntd').remove()
  }
})


containerOfUserInput.addEventListener('click', () => {
  userInputLayer.classList.add('showInputLayer')
  taskNameInputTag.addEventListener('keyup', () => {
    if (taskNameInputTag.value != '') addTaskBtn.classList.remove('disabled')
    else addTaskBtn.classList.add('disabled')
  })
  
})

cancelTag.addEventListener('click', () => {
 userInputLayer.classList.remove('showInputLayer')
})


addTaskBtn.addEventListener('click', () => {
  containerArray = []

  const inputValue = taskNameInputTag.value
  const description = document.querySelector('.textDescription').value
  const dateTime = document.getElementById('flat').value
  
  const dateObj = new Date(dateTime)

  
  function MyObject(taskName, taskId, description, dateObj) {
    this.taskName = taskName
    this.taskId = taskId
    this.description = description
    this.dateObj = dateObj
  

   }

  taskObj = new MyObject(inputValue, taskId, description, dateObj)

  containerArray.push(taskObj)

  if (localStorage.hasOwnProperty('previousData')) {
    dataFromLocalStorage = localStorage.getItem('previousData')
    arrayConvertedJson = JSON.parse(dataFromLocalStorage)
    const concatArray = [...arrayConvertedJson, ...containerArray]
    localStorage.setItem('previousData', JSON.stringify(concatArray))
  } else {
    localStorage.setItem('previousData', JSON.stringify(containerArray))
  }

  createTaskFn()

  taskId++
  setTimeout(() => {
    userInputLayer.classList.remove('showInputLayer')
  }, 500);
})

function createTaskFn() {
  if (localStorage.hasOwnProperty('previousData')) {
    document.querySelector('.listContainer').innerHTML = ''
    dataFromLocalStorage = localStorage.getItem('previousData')
    arrayConvertedJson = JSON.parse(dataFromLocalStorage)
    arrayConvertedJson.forEach((ele) =>
      applyTaskListFn(ele.taskName, ele.taskId, ele.description),
    )
  } else noTaskArray.forEach((ele) => applyTaskListFn(ele.taskName, ele.taskId, ele.description))
}

function removeTaskFn(event) {
  const targetTag = event.target.parentNode.parentNode.id
  if (targetTag === 'ntd') {
    return
  }
  event.target.parentNode.parentNode.style.opacity = 0
  setTimeout(() => {
    event.target.parentNode.parentNode.remove()
    localStorageDataRemoveFn(targetTag)
  }, 500)
}

function localStorageDataRemoveFn(IdPara) {
  const dataFromLocalStorage = localStorage.getItem('previousData')
  const arrayConvertedJson = JSON.parse(dataFromLocalStorage)
  const filteredArray = arrayConvertedJson.filter((obj) => {
    return obj.taskId != IdPara
  })

  localStorage.setItem('previousData', JSON.stringify(filteredArray))

  if (filteredArray.length === 0) {
    localStorage.removeItem('previousData')
    createTaskFn()
  }
}

function applyTaskListFn(userInput, id, desc) {
  const listTag = document.createElement('div')
  listTag.classList.add(
    'listTag',
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-center',
    'hideTag'
  )
  listTag.id = id
 
  const innerTaskWarpper = document.createElement('div')
  innerTaskWarpper.classList.add(
    'd-flex',
    'justify-content-between'
  )

  const radioInput = document.createElement('input')
  radioInput.classList.add('form-check-input', 'mt-1', 'me-1')
  radioInput.type = 'radio'

  const taskInfoDiv = document.createElement('div')
  taskInfoDiv.classList.add('ms-2', 'me-auto')

  const taskLabel = document.createElement('label')
  taskLabel.classList.add('fw-bold', 'form-check-label', 'textWarp')
  taskLabel.setAttribute('for', id)
  taskLabel.textContent = userInput

  const taskDesc = document.createElement('p')
  taskDesc.classList.add('mb-0')
  taskDesc.textContent = desc

  taskInfoDiv.append(taskLabel, taskDesc)

  innerTaskWarpper.append(radioInput, taskInfoDiv)

  const deadlinSpan = document.createElement('span')
  deadlinSpan.classList.add('badge', 'bg-danger', 'rounded-pill')
  deadlinSpan.textContent = 'tomorrow'

  listTag.append(innerTaskWarpper, deadlinSpan)
  document.querySelector('.listContainer').append(listTag)

  radioInput.addEventListener('click', (event) => {
    setTimeout(() => {
      removeTaskFn(event)
    }, 2000)
  })
  
  setTimeout(() => {
    listTag.style.opacity = 1
  }, 100)

}

flatpickr('#flat', {
  disableMobile: "true",
  enableTime: true,
  altInput: true,
  minDate: "today",
  altFormat: 'j M, Y h:i K ',
  dateFormat: 'Z',
  defaultDate: new Date()
})
