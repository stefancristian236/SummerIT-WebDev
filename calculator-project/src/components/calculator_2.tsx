import { useState } from 'react'
import { Keyboard } from '../UI/Keyboard'

const Calculator_2 = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operation, setOperation] = useState('');
  const [prevValue, setPrevValue] = useState('');
  const [overwrite, setOverwrite] = useState(true);
  const calculate = () => {
    if (!operation || !prevValue) return displayValue;
    const current = parseFloat(displayValue);
    const previous = parseFloat(prevValue);

    let result = 0;
    switch(operation) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        if (current === 0) {
          alert('Cannot divide by zero');
          return displayValue;
        }
        result = previous / current;
        break;
      case '^':
        result = Math.pow(previous, current);
        break;
      case 'sqrt':
        result = Math.sqrt(current);
        break;
      case 'sqrtn':
        result = Math.pow(previous, 1/current);
        break;
      case 'mod':
        result = previous % current;
        break;
      case '10x':
        result = Math.pow(10, current);
        break;
      case '2x':
        result = Math.pow(2, current);
        break;
      case '3x':
        result = Math.pow(3, current);
        break;
      case 'x^2':
        result = Math.pow(current, 2);
        break;
      case 'x^3':
        result = Math.pow(current, 3);
        break;
      default:
        return displayValue;
      }
      return result.toString();
    };

    const equals = () => {
      const value = calculate();
      setDisplayValue(value);
      setPrevValue('');
      setOperation('');
      setOverwrite(true);
    };

    const selectOperation = (nextOperation: string) => {
      if (prevValue && operation && !overwrite) {
        const value = calculate();
        setPrevValue(value);
        setDisplayValue(value);
      } else {
        setPrevValue(displayValue);
      }
      setOperation(nextOperation);
      setOverwrite(true);
    };

    const clearDisplay = () => {
      setDisplayValue('0');
      setOperation('');
      setPrevValue('');
      setOverwrite(true);
    };

    const deleteLast = () => {
      if (overwrite || displayValue.length === 1) {
        setDisplayValue('0');
        setOverwrite(true);
      } else {
        setDisplayValue(displayValue.slice(0, -1));
      }
    };

    const setDigit = (digit: string) => {
      if (displayValue[0] === '0' && digit === '0') return;
      if (displayValue.includes('.') && digit === '.') return;
      if (overwrite && digit) {
        setDisplayValue(digit);
      } else {
        setDisplayValue(`${displayValue}${digit}`);
      }
      setOverwrite(false);
    };

    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000]">
          <div className='bg-[#1a1a1a] rounded-lg shadow-lg h-[600px] w-[450px] p-6'>
            <div>
              <div className='bg-[#2a2a2a] text-white rounded-lg p-4 mb-4 h-[100px] flex items-center justify-end text-right text-3xl'>
                <input className='allign-right w-full h-full bg-transparent outline-none text-right' type="text" value={displayValue} readOnly />
              </div>
              <div className='bg-[#2a2a2a] text-white rounded-lg p-4 h-[440px] flex items-center justify-center text-center text-xl'>
                <div className='grid grid-cols-5 gap-2 flex items-center justify-center h-full w-full'>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('10x')}>10^x</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('2x')}>2^x</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('3x')}>3^x</Keyboard>

                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={deleteLast}>C</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={clearDisplay}>CE</Keyboard>

                
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('1')}>1</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('2')}>2</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('3')}>3</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('4')}>4</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('5')}>5</Keyboard>

                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('6')}>6</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('7')}>7</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('8')}>8</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('9')}>9</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('0')}>0</Keyboard>

                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('.')}>.</Keyboard>

              
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('+')}>+</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('-')}>-</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('*')}>*</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('/')}>/</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={equals}>=</Keyboard>

               
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('^')}>x^y</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('sqrt')}>sqrt</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('sqrtn')}>sqrtn</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('mod')}>mod</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('x^2')}>x^2</Keyboard>
                  <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => selectOperation('x^3')}>x^3</Keyboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Calculator_2
