class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const current = parseFloat(this.currentOperand)
        const prev = parseFloat(this.previousOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break   
            default:
                return        
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    root() {
        this.currentOperand = Math.sqrt(parseFloat(this.currentOperand))
    }

    square() {
        this.currentOperand *= parseFloat(this.currentOperand)
    }

    plusminus() {
        this.currentOperand = parseFloat(parseFloat(this.currentOperand) * -1)
    }

        getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
      
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const rootButton = document.querySelector('[data-root]')
const squareButton = document.querySelector('[data-square]')
const plusMinusButton = document.querySelector('[data-plus-minus]')



const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

rootButton.addEventListener('click', button => {
    calculator.root()
    calculator.updateDisplay()
})

squareButton.addEventListener('click', button => {
    calculator.square()
    calculator.updateDisplay()
})

plusMinusButton.addEventListener('click', button => {
    calculator.plusminus()
    calculator.updateDisplay()
})


/*
<button data-operation-root >√</button>
<button data-operation-squared >x²</button>
<button data-operation-minus class="span-two" >±</button>
JS:
root2() {
const chislo = parseFloat(this.currentOperand);
this.currentOperand = Math.sqrt(chislo);
}

squared() {
const chislo = parseFloat(this.currentOperand);
this.currentOperand = chislo ** 2;
}

minus() {
const chislo = parseFloat(this.currentOperand);
this.currentOperand = chislo * -1;
}

const rootOperationButton = document.querySelector('[data-operation-root]');
const squaredOperationButton = document.querySelector('[data-operation-squared]');
const minusOperationButton = document.querySelector('[data-operation-minus]');
*/