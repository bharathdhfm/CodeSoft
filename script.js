
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    function updateDisplay(value) {
        display.textContent = value || '0';
    }

    function handleButtonClick(event) {
        const action = event.target.getAttribute('data-action');
        const value = event.target.textContent;

        if (action === 'clear') {
            currentInput = '';
            operator = '';
            previousInput = '';
            updateDisplay('0');
        } else if (action === 'equals') {
            if (previousInput && operator && currentInput) {
                try {
                    currentInput = String(eval(`${previousInput} ${operator} ${currentInput}`));
                    updateDisplay(currentInput);
                    previousInput = '';
                    operator = '';
                } catch {
                    updateDisplay('Error');
                }
            }
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            if (currentInput === '') return; 
            if (previousInput && operator) {
                try {
                    currentInput = String(eval(`${previousInput} ${operator} ${currentInput}`));
                } catch {
                    updateDisplay('Error');
                    return;
                }
            }
            operator = action === 'add' ? '+' : action === 'subtract' ? '-' : action === 'multiply' ? '*' : '/';
            previousInput = currentInput;
            currentInput = '';
            updateDisplay(previousInput + ' ' + operator);
        } else { 
            currentInput += value;
            updateDisplay(previousInput + ' ' + operator + ' ' + currentInput);
        }
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});
