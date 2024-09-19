const display = document.querySelector(".display")
const numberButtons = document.querySelectorAll(".number-button")
const operatorButtons = document.querySelectorAll(".operator")
const equalsButton = document.querySelector(".equals")
const allClearButton = document.querySelector(".clear")
const backspaceButton = document.querySelector(".backspace")
const decimalButton = document.querySelector(".decimal")
const toggleMinusButton = document.querySelector(".toggle-negate")

let numbers = [];
let currentOperator = "";
let operatorPressed = false;
let equalsPressed = false;
display.textContent = "0"
backspaceButton.disabled = true;

function clearDisplay() {
    display.textContent = ""
}

function updateDisplay(content) {
    display.textContent += content
}

function checkDecimalStatus(displayContent) {
    if (displayContent.includes(".")) {
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
}