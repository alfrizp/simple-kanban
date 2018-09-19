let commandInputElement = document.getElementById('commandInput')
let todoBoardElement = document.getElementById('todoBoard')
let doingBoardElement = document.getElementById('doingBoard')
let doneBoardElement = document.getElementById('doneBoard')

let NEXT_TASK_ID = 1
let ALL_TASK = []
let AVAILABLE_BOARD = ['todo', 'doing', 'done']
class TaskClass {
  constructor(id, text) {
    this.id = id
    this.text = text
    this.board = 'todo'
  }
}

function enterCommand() {
  let commandValue = commandInputElement.value
  let firstSpacePos = commandValue.indexOf(' ')
  let commandType = commandValue.substr(0, firstSpacePos)
  let taskText = commandValue.substr(firstSpacePos+1)

  if (commandType === 'create') {
    let text = taskText.substr(1, taskText.length-2)

    ALL_TASK.push(new TaskClass(NEXT_TASK_ID, text))
    NEXT_TASK_ID++
  } else if(commandType === 'move') {
    let lastSpacePos = commandValue.lastIndexOf(' ')
    let dstBoard = commandValue.substring(lastSpacePos+1)
    let taskId = Number(commandValue.substring(firstSpacePos+1, lastSpacePos))

    if (!AVAILABLE_BOARD.includes(dstBoard)) return alert('Board tidak tersedia')
    ALL_TASK.map(cmd => (cmd.id === taskId) ? cmd.board = dstBoard : '')
  } else if(commandType === 'remove') {
    let taskId = Number(taskText)
    let selectedTaskPos = 0

    ALL_TASK.forEach((cmd, idx) => (cmd.id === taskId) ? selectedTaskPos === idx : '')
    ALL_TASK.splice(selectedTaskPos,1)
  } else {
    return alert('Command tidak tersedia')
  }
  commandInputElement.value = ''
  renderAll()
}

function renderAll() {
  let TODO_BOARD = ALL_TASK.filter(cmd => cmd.board === 'todo')
  let DOING_BOARD = ALL_TASK.filter(cmd => cmd.board === 'doing')
  let DONE_BOARD = ALL_TASK.filter(cmd => cmd.board === 'done')

  todoBoardElement.innerHTML = TODO_BOARD.map(cmd => '(' + cmd.id + ') ' + cmd.text).join('\n')
  doingBoardElement.innerHTML = DOING_BOARD.map(cmd => '(' + cmd.id + ') ' + cmd.text).join('\n')
  doneBoardElement.innerHTML = DONE_BOARD.map(cmd => '(' + cmd.id + ') ' + cmd.text).join('\n')
}
