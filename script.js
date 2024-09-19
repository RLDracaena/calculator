const display = document.querySelector(".display")
const numberButtons = document.querySelectorAll(".number-button")
const operatorButtons = document.querySelectorAll(".operator")
const equalsButton = document.querySelector(".equals")
const allClearButton = document.querySelector(".clear")
const backspaceButton = document.querySelector(".backspace")
const decimalButton = document.querySelector(".decimal")
const toggleNegativeButton = document.querySelector(".toggle-negate")
const addOperator = document.querySelector(".add")

let numbers = [];
let currentOperator = "";
let operatorPressed = false;
let equalsPressed = false;
let allClearPressed = true;
let decimalPressed = false;
display.textContent = "0"
backspaceButton.disabled = true;

numberButtons.forEach(button => button.addEventListener("click", () => {
    operatorButtons.forEach(button => button.disabled = false)
    decimalButton.disabled = false
    backspaceButton.disabled = false
    toggleNegativeButton.disabled = false
    

    if(operatorPressed === true || equalsPressed === true) {
        clearDisplay();
    }

    if (decimalPressed === true) {
        decimalButton.disabled = true
    }

    if(allClearPressed === true && decimalPressed === false) {
        clearDisplay();
    }
    checkDecimalStatus()
    operatorPressed = false
    updateDisplay(pressKey(button.textContent))

    display.style.fontSize = "40px"
    let length = display.textContent.toString().length
    if (length === 15) {
        numberButtons.forEach(button => button.disabled = true)
    }

}))

operatorButtons.forEach(button => button.addEventListener("click", () => {
    operatorPressed = true
    equalsPressed = false
    allClearPressed = false
    decimalPressed = false
    numberButtons.forEach(button => button.disabled = false)
    operatorButtons.forEach(button => button.disabled = true)
    decimalButton.disabled = true
    toggleNegativeButton.disabled = true
    backspaceButton.disabled = true
    numbers.push(Number(display.textContent))
    console.log(numbers)
    currentOperator = button.textContent
    updateDisplay(currentOperator)

    if (numbers.length === 2) {
        operate(numbers, currentOperator)
    }
    // length will be more than 2 if pressed an operator after using equals button
    if (numbers.length > 2) {
        numbers.shift()
        numbers.shift()
    }
    console.log(numbers)
}))

equalsButton.addEventListener("click", () => {
    operatorPressed = false
    equalsPressed = true
    allClearPressed = false
    operatorButtons.forEach(button => button.disabled = false)
    decimalButton.disabled = true

    if (numbers.length !== 2) {
        numbers.push(Number(display.textContent))
    }
    console.log(numbers)

    if (numbers.length === 2) {
        operate(numbers, currentOperator)
    }

    console.log(numbers)

})

decimalButton.addEventListener("click", () => {
    checkDecimalStatus(display.textContent)
})

toggleNegativeButton.addEventListener("click", () => {
    display.textContent = toggleNegative(Number(display.textContent))
})

allClearButton.addEventListener("click", clearAll)

backspaceButton.addEventListener("click", deleteItem)


function deleteItem() {
    let length = display.textContent.toString().length
    display.textContent = display.textContent.substring(0, length-1)
    checkDecimalStatus()

}


function clearAll() {
    allClearPressed = true
    display.textContent = "0"
    numbers = []
    operatorPressed = false
    numberButtons.forEach(button => button.disabled = false)
    operatorButtons.forEach(button => button.disabled = false)
    decimalButton.disabled = false
    backspaceButton.disabled = true
    toggleNegativeButton.disabled = false
    equalsPressed = false
    decimalPressed = false
    currentOperator = ""
    display.style.fontSize = "40px"
    console.log(numbers)
}


function operate(array, operator) {
    if (operator === "+") {
        display.textContent = add(array)
    }
    else if (operator === "-") {
        display.textContent = subtract(array)
    }
    else if (operator === "x") {
        display.textContent = multiply(array)
    }
    else if (operator === "/") {
        display.textContent = divide(array)
    }
    numbers[0] = Number(display.textContent)
    if (operatorPressed === true) {
        updateDisplay(operator)
    }
    if (equalsPressed === false) {
        numbers.pop()
    }
}

function add(array) {
    let filtered = array.filter(item => !Number.isNaN(item))
    let result = filtered.reduce((sum, current) => sum += current)
    if (result.toString().length > 17) {
        display.style.fontSize = "30px"
    }
    return parseFloat(result.toFixed(20))
}

function subtract(array) {
    let filtered = array.filter(item => !Number.isNaN(item))
    let result = filtered.reduce((sum, current) => sum -= current)
    if (result.toString().length > 17) {
        display.style.fontSize = "30px"
    }
    return parseFloat(result.toFixed(20))
}

function multiply(array) {
    let filtered = array.filter(item => !Number.isNaN(item))
    let result = filtered.reduce((sum, current) => sum *= current)
    if (result.toString().length > 17) {
        display.style.fontSize = "30px"
    }
    return parseFloat(result.toFixed(20))
}

function divide(array) {
    let filtered = array.filter(item => !Number.isNaN(item))
    let result = filtered.reduce((sum, current) => sum /= current)
    if (result.toString().length > 17) {
        display.style.fontSize = "30px"
    }
    return parseFloat(result.toFixed(20))
}

function pressKey(key) {
    operatorPressed = false
    equalsPressed = false
    allClearPressed = false
    return key
}


function clearDisplay() {
    display.textContent = ""
}

function updateDisplay(content) {
    display.textContent += content
}

function checkDecimalStatus() {
    if (display.textContent.includes(".")) {
        decimalButton.disabled = true
    }
    else {
        decimalButton.disabled = false
    }
}

function toggleNegative(num) {
    if (num > 0) {
        return -num
    }
    else if (num < 0) {
        return num * -1
    }
    else if (num === 0) {
        return 0
    }
}