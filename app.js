// Define UI Vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Loadl all event listeners
loadEventListeners()

// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask)
  // Remove task event
  taskList.addEventListener('click', removeTask)
  // Clear tasks event
  clearBtn.addEventListener('click', clearTasks)
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks)
}

// Get Tasks from LS
function getTasks(){
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li')
    // Add class
    li.className = 'collection-item'
    // Create text node and append li
    li.appendChild(document.createTextNode(task))
    // Create new link element
    const link = document.createElement('a')
    // Add class
    link.className = 'delete-item secondary-content'
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append the link to li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li)
  })
}

// Add Task
function addTask (e) {
  if(taskInput.value === ''){
    alert('Add a task')
  }

  // Create li element
  const li = document.createElement('li')
  // Add class
  li.className = 'collection-item'
  // Create text node and append li
  li.appendChild(document.createTextNode(taskInput.value))
  // Create new link element
  const link = document.createElement('a')
  // Add class
  link.className = 'delete-item secondary-content'
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append the link to li
  li.appendChild(link)

  // Append li to ul
  taskList.appendChild(li)
  
  // Store in LS
  storeTaskInLocalStorage(taskInput.value)

  // Clear Input
  taskInput.value = ''

  e.preventDefault()
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove()

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// CLear Tasks
function clearTasks(){
  // Slower method
  // taskList.innerHTML = ''

  // Faster method
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  // https://jsperf.com/innerhtml-vs-removechild

  // Clear tasks from LS
  clearTasksFromLocalStorage()
}

// Clear Tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear()
}

// Filter Tasks
function filterTasks(e){
  // we use toLowerCase so whatever is searched will match perfectly.
  const text = e.target.value.toLowerCase()

  // We can use forEach because querySelectorAll returns a node list. If we got element by class, then we'd get html, and we'd have to convert it into an array to use forEach
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}