const calculator = document.querySelector('.calculator');
const screen = document.querySelector('#display_screen');
const key = calculator.querySelector('.keypad');
const keyEquals = calculator.querySelector('.keypad_equals');


key.addEventListener('click', e => 
{
    if(e.target.matches('input'))
    {
        const operation = e.target.dataset.operation;
        const content = e.target.value;
        const displayedNumber = screen.textContent;
        if(!operation)
        {
            if(displayedNumber === '0' || displayedNumber === '-' || 
               displayedNumber === '*' || displayedNumber === '/' ||
               displayedNumber === '+')
            {
                screen.textContent = content; 
            } else {
                screen.textContent = displayedNumber + content;
                keyEquals.removeAttribute("disabled");
            }
        }
        if(operation === 'add' || operation === 'minus' ||
           operation === 'multiply' || operation === 'divide'){
            if(!screen.textContent.includes(operation)){
                screen.textContent = e.target.value;
                calculator.dataset.operations = operation;
            }
            calculator.dataset.firstValue = displayedNumber;
            keyEquals.removeAttribute("disabled");
        }
        if(operation === 'clear'){
            location.reload();
        }
        if(operation === 'delete'){
            const del = displayedNumber.slice(0, -1);
            screen.textContent = del;
            if(del.length === 0){
                screen.textContent = '0';
            }
        }
        if(operation === 'decimal'){
            if(!displayedNumber.includes('.')){
                screen.textContent = displayedNumber + '.';
            }
            if(displayedNumber == calculator.dataset.operation){
                screen.textContent = '0' + content;
            }
        }
        if(operation === 'equals'){
            let firstValue = calculator.dataset.firstValue;
            let operator = calculator.dataset.operations;
            let secondValue = displayedNumber;
            const result = (firstValue, operator, secondValue) => {
                let data = 0;
                if(operator === 'add'){
                    data = parseFloat(firstValue) + parseFloat(secondValue);
                } else if(operator === 'minus'){
                    data = parseFloat(firstValue) - parseFloat(secondValue);
                } else if(operator === 'multiply'){
                    data = parseFloat(firstValue) * parseFloat(secondValue);
                } else if(operator === 'divide'){
                    data = parseFloat(firstValue) / parseFloat(secondValue);
                }
                return data;
            }
            if(!operator){
                screen.textContent = displayedNumber;
            } else {
                screen.textContent = result(firstValue, operator, secondValue);
                keyEquals.setAttribute("disabled", "");
            }

        }
    }
});