function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function deleteLastEntry() {
    const display = document.getElementById('display');
    const currentValue = display.value;

    if (currentValue.length > 0) {
        display.value = currentValue.slice(0, -1);
    }
}

function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function calculateResult() {
    const display = document.getElementById('display');
    const expression = display.value;

    try {
        const result = evaluateExpression(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}


function evaluateExpression(expression) {
    // Define an array of basic mathematical operators.
    const operators = ['+', '-', '*', '/'];

    // Split the expression into numbers and operators using a regular expression.
    const values = expression.split(/([-+*/])/);

    // Initialize variables to track the result and the current operator.
    let result = 0;
    let currentOperator = '+';

    // Iterate through the values (numbers and operators) in the expression.
    for (const value of values) {
        if (operators.includes(value)) {
            // If the current value is an operator, update the currentOperator.
            currentOperator = value;
        } else {
            // If the value is a number, parse it into a floating-point number.
            const num = parseFloat(value);

            // Check if the parsed number is valid (not NaN).
            if (!isNaN(num)) {
                // Perform the corresponding mathematical operation based on the currentOperator.
                switch (currentOperator) {
                    case '+':
                        result += num;
                        break;
                    case '-':
                        result -= num;
                        break;
                    case '*':
                        result *= num;
                        break;
                    case '/':
                        // Check for division by zero.
                        if (num !== 0) {
                            result /= num;
                        } else {
                            // Throw an error for division by zero.
                            throw new Error('Division by zero');
                        }
                        break;
                    default:
                        // Throw an error for an invalid operator.
                        throw new Error('Invalid operator');
                }
            } else {
                // Throw an error for invalid input (non-numeric values).
                throw new Error('Invalid input');
            }
        }
    }

    // Return the final result of the expression.
    return result;
}
