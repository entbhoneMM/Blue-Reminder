const userInputTag = document.querySelector('#userInputTag')
let taskId = 0

userInputTag.addEventListener('change', (event) => {
  applyTaskListFn(event.target.value, taskId)
  taskId++
  event.target.value = ''
})

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
    event.target.parentNode.parentNode.style.opacity = 0
    setTimeout(() => {
      event.target.parentNode.parentNode.remove()

    }, 500)

    // console.log(targetTag)
  })
}

/* --------------------------------------------------------------------------------------------------------------- */

// const radio
