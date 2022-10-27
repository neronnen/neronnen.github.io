class Calculator {
  constructor(
    previousOperandOperandTextElement,
    currentOperandOperandTextElement
  ) {
    this.previousOperandOperandTextElement = previousOperandOperandTextElement;
    this.currentOperandOperandTextElement = currentOperandOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  choseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationsButtons = document.querySelectorAll("[data-operation]");
const equalButtons = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const clearButtons = document.querySelector("[data-clear]");
const previousOperandOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandOperandTextElement,
  currentOperandOperandTextElement
);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.choseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalButtons.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
clearButtons.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButtons.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
