const $ = document.querySelector.bind(document)

const openSheetButton = $("#open-sheet")
const sheet = $("#sheet")
const sheetContents = sheet.querySelector(".app-bottom-sheet__contents")
const draggableArea = sheet.querySelector(".app-bottom-sheet__draggable-area")
const html = document.querySelector("html")

let sheetHeight // in vh

const setSheetHeight = (value) => {
  sheetHeight = Math.max(0, Math.min(100, value))
  sheetContents.style.height = `${sheetHeight}vh`

  if (sheetHeight === 100) {
    sheetContents.classList.add("fullscreen")
  } else {
    sheetContents.classList.remove("fullscreen")
    // Add overflow hidden to html and body tags
    document.body.classList.add("app-bottom-sheet__body")
    html.classList.add("app-bottom-sheet__body")
  }
}

const setIsSheetShown = (isShown) => {
  sheet.setAttribute("aria-hidden", String(!isShown))
}

// Open the sheet when clicking the 'open sheet' button
openSheetButton.addEventListener("click", () => {
  setSheetHeight(Math.min(50, 720 / window.innerHeight * 100))
  setIsSheetShown(true)
})

// Hide the sheet when clicking the 'close' button
sheet.querySelector(".app-bottom-sheet__close-sheet").addEventListener("click", () => {
  setIsSheetShown(false)
  // Remove overflow hidden to html and body tags
  document.body.classList.remove("app-bottom-sheet__body")
  html.classList.remove("app-bottom-sheet__body")
})

// Hide the sheet when clicking the background
sheet.querySelector(".app-bottom-sheet__overlay").addEventListener("click", () => {
  setIsSheetShown(false)
  // Remove overflow hidden to html and body tags
  document.body.classList.remove("app-bottom-sheet__body")
  html.classList.remove("app-bottom-sheet__body")
})

const isFocused = element => document.activeElement === element

// Hide the sheet when pressing Escape if the target element
// is not an input field
window.addEventListener("keyup", (event) => {
  const isSheetElementFocused =
    sheet.contains(event.target) && isFocused(event.target)

  if (event.key === "Escape" && !isSheetElementFocused) {
    setIsSheetShown(false)
  }
})

const touchPosition = (event) =>
  event.touches ? event.touches[0] : event

let dragPosition

const onDragStart = (event) => {
  dragPosition = touchPosition(event).pageY
  sheetContents.classList.add("not-selectable")
  draggableArea.style.cursor = document.body.style.cursor = "grabbing"
}

const onDragMove = (event) => {
  if (dragPosition === undefined) return

  const y = touchPosition(event).pageY
  const deltaY = dragPosition - y
  const deltaHeight = deltaY / window.innerHeight * 100

  setSheetHeight(sheetHeight + deltaHeight)
  dragPosition = y
}

const onDragEnd = () => {
  dragPosition = undefined
  sheetContents.classList.remove("not-selectable")
  draggableArea.style.cursor = document.body.style.cursor = ""

  if (sheetHeight < 35) {
    setIsSheetShown(false)
    // Remove overflow hidden to html and body tags
    document.body.classList.remove("app-bottom-sheet__body")
    html.classList.remove("app-bottom-sheet__body")
  } else if (sheetHeight > 75) {
    setSheetHeight(98)
  } else {
    setSheetHeight(50)
  }
}

draggableArea.addEventListener("mousedown", onDragStart)
draggableArea.addEventListener("touchstart", onDragStart)

window.addEventListener("mousemove", onDragMove)
window.addEventListener("touchmove", onDragMove)

window.addEventListener("mouseup", onDragEnd)
window.addEventListener("touchend", onDragEnd)