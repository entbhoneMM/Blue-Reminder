const userInputTag = document.querySelector('#userInputTag')
let taskId = 0,
  containerArray = [],
  taskObj,
  jsonConvertedArray,
  jsonConvertTaskObj

userInputTag.addEventListener('change', (event) => {


  const inputValue = event.target.value
  applyTaskListFn(inputValue, taskId)
  
  localStorage.removeItem('previousData')

  // Object Constructer
  function MyObject(param1 = 'default1', param2 = 'default2') {
    this.taskName = param1
    this.taskId = param2
  }

  taskObj = new MyObject(inputValue, taskId);
  // jsonConvertTaskObj = JSON.stringify(taskObj)
  
  containerArray.push(taskObj)

  jsonConvertedArray = JSON.stringify(containerArray)
  localStorage.setItem('previousData', jsonConvertedArray)



  taskId++
  event.target.value = ''
})










/* -----------------------------for Local Storage----------------------------------------------------------------- */
// console.log(containerArray)





/*---------------------------------DOM Create process----------------------------------------------------------- */
function applyTaskListFn(userInput, id) {
  const listTag = document.createElement('div')
  listTag.classList.add(
    'listTag',
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'align-items-center',
    'hideTag',
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
    const targetTag = event.target.parentNode.parentNode.id
    event.target.parentNode.parentNode.style.opacity = 0
    setTimeout(() => {
      event.target.parentNode.parentNode.remove()

      const dataFromLocalStorage = localStorage.getItem('previousData')
      const arrayConvertedJson = JSON.parse(dataFromLocalStorage)
      const filteredArray = arrayConvertedJson.filter( obj => {
        return obj.taskId != targetTag
      })

      localStorage.setItem('previousData', JSON.stringify(filteredArray))

      if (filteredArray.length === 0) {
     
        localStorage.removeItem('previousData')

      }

    }, 500)
  })
}



