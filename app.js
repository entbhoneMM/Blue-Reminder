const userInputTag = document.querySelector('#userInputTag')
let taskId = 0,
  containerArray = [],
  taskObj,
  jsonConvertedArray,
  dataFromLocalStorage,
  arrayConvertedJson


window.addEventListener('load', () => {
  createTaskFn()
  const finalTaskID = arrayConvertedJson[arrayConvertedJson.length-1].taskId
  taskId = finalTaskID + 1

} )


userInputTag.addEventListener('change', (event) => {

  containerArray = []

  const inputValue = event.target.value

  // Object Constructer
  function MyObject(taskName, taskId) {
    this.taskName = taskName
    this.taskId = taskId
  }

  taskObj = new MyObject(inputValue, taskId);
  
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
  event.target.value = ''
})












function createTaskFn () {

  if (localStorage.hasOwnProperty('previousData')) {

    document.querySelector('.listContainer').innerHTML = ''

    dataFromLocalStorage = localStorage.getItem('previousData')
    arrayConvertedJson = JSON.parse(dataFromLocalStorage)
    arrayConvertedJson.forEach((ele) => {

      applyTaskListFn(ele.taskName, ele.taskId)
      // document.querySelector('.listContainer').innerHTML += taskTag

    });

  }

}



function removeTaskFn (event) {

  const targetTag = event.target.parentNode.parentNode.id
  event.target.parentNode.parentNode.style.opacity = 0
  setTimeout(() => {
  event.target.parentNode.parentNode.remove()
  localStorageDataRemoveFn(targetTag)
  
  }, 500)

}



function localStorageDataRemoveFn (IdPara) {
  const dataFromLocalStorage = localStorage.getItem('previousData')
      const arrayConvertedJson = JSON.parse(dataFromLocalStorage)
      const filteredArray = arrayConvertedJson.filter( obj => {
        return obj.taskId != IdPara
      })

      localStorage.setItem('previousData', JSON.stringify(filteredArray))

      if (filteredArray.length === 0) {
     
        localStorage.removeItem('previousData')

      }
}





function applyTaskListFn(userInput, id) {
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
  setTimeout(() => {
    listTag.style.opacity = 1
  }, 100)

  const innerTaskWarpper = document.createElement('div')
  innerTaskWarpper.classList.add(
    'd-flex',
    'justify-content-between',
    'align-items-center',
  )

  const radioInput = document.createElement('input')
  radioInput.classList.add('form-check-input', 'mt-0', 'me-3')
  radioInput.type = 'radio'

  const taskLabel = document.createElement('label')
  taskLabel.classList.add('fw-bold', 'form-check-label', 'textWarp')
  taskLabel.textContent = userInput

  innerTaskWarpper.append(radioInput, taskLabel)

  const deadlinSpan = document.createElement('span')
  deadlinSpan.classList.add('badge', 'bg-danger', 'rounded-pill')
  deadlinSpan.textContent = 'tomorrow'

  listTag.append(innerTaskWarpper, deadlinSpan)
  document.querySelector('.listContainer').append(listTag)

  radioInput.addEventListener('click', (event) => {
    removeTaskFn(event)
  })

}