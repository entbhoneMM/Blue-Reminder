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
    arrayConvertedJson.forEach(task => {
      const taskTag = `
          <div
            class="listTag list-group-item d-flex justify-content-between align-items-center"
            id="${task.taskId}"
          >
            <div class="d-flex justify-content-between align-items-center">
              <input type="radio" class="delTag form-check-input mt-0 me-3" id="task" />
              <label class="fw-bold form-check-label textWarp" for="task">
                ${task.taskName}
              </label>
            </div>
            <span class="badge bg-danger rounded-pill">today</span>
          </div>`

          document.querySelector('.listContainer').innerHTML += taskTag

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
