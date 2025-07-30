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
      case 'sin_x':
        result = Math.sin(current);
        break;
      case 'cos_x':
        result = Math.cos(current);
        break;
      case 'tan_x':
        result = Math.tan(current);
        break;
      case 'sinh_x':
        result = Math.sinh(current);
        break;
      case 'cosh_x':
        result = Math.cosh(current);
        break;
      case 'tanh_x':
        result = Math.tanh(current);
        break;
      case 'asin_x':
        result = Math.asin(current);
        break;
      case 'acos_x':
        result = Math.acos(current);
        break;
      case 'atan_x':
        result = Math.atan(current);
        break;
      case 'n!':
        if (current === 0)
          result = 1;
        else {
          if (Math.floor(current) === Math.ceil(current)){
            result = 1;
            for (let i = 1; i <= current; i++){
              result = result * i; 
            }
          } else {
            alert('Not integer');
            return displayValue;
            break;
          } 
        }
        break;
      case 'ln':
        if (current <= 0) {
          alert ('Undefined');
          return displayValue;
          break;
        } else {
          result = Math.log(current);
        }
        break;
                break;
      case 'log2':
        if (current <= 0) {
          alert ('Undefined');
          return displayValue;
          break;
        } else {
          result = Math.log2(current);
        }
        break;
      case 'log10':
        if (current <= 0) {
          alert ('Undefined');
          return displayValue;
          break;
        } else {
          result = Math.log10(current);
        }
        break;
      case 'abs':
        result = Math.abs(current);
        break;
      case 'exp':
        result = Math.pow(Math.E, current);
        break;
      case 'floor':
        result = Math.floor(current);
        break;
      case 'ceil':
        result = Math.ceil(current);
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
      if (digit === 'e') {
        setDisplayValue(Math.E.toString());
        setOverwrite(true);
        return;
      }
      if (digit === 'pi') {
        setDisplayValue(Math.PI.toString());
        setOverwrite(true);
        return;
      }
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
  <div className='bg-[#1a1a1a] rounded-lg shadow-lg h-[800px] w-[650px] p-6'>
    <div>
      <div className='bg-[#2a2a2a] text-white rounded-lg p-5 mb-5 h-[100px] flex items-center justify-end text-right text-3xl'>
        <input className='text-right w-full h-full bg-transparent outline-none' type="text" value={displayValue} readOnly />
      </div>
      <div className='bg-[#2a2a2a] text-white rounded-lg p-4 h-[640px] overflow-y-auto'>
        <div className='grid grid-cols-8 gap-4 flex items-center justify-center h-full w-full text-sm'>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('10x')}>10^x</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('2x')}>2^x</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('3x')}>3^x</Keyboard>
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

          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('sin_x')}>sin(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('cos_x')}>cos(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('tan_x')}>tan(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('sinh_x')}>sinh(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('cosh_x')}>cosh(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('tanh_x')}>tanh(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('asin_x')}>arcsin(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('acos_x')}>arccos(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('atan_x')}>arctan(x)</Keyboard>

          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('n!')}>n!</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('e')}>e</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3' onClick={() => setDigit('pi')}>pi</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('ln')}>ln(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('log2')}>log2(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('log10')}>log10(x)</Keyboard>

          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('abs')}>abs(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('floor')}>floor(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('ceil')}>ceil(x)</Keyboard>
          <Keyboard className='bg-[#4a4a4a] text-white rounded-lg p-3 whitespace-normal text-center' onClick={() => selectOperation('exp')}>exp(x)</Keyboard>
 


        </div>
      </div>
    </div>
  </div>
</div>

      </>
    )
}

export default Calculator_2
