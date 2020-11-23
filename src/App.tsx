import React, { useState } from 'react';
import classnames from 'classnames';

import './App.css';

function App() {
  const [text, setText] = useState('');

  const handleValue = (value: string | number) => () => {
    try {
      switch (value) {
        // Clear everything
        case 'AC':
          setText('');
          break;

        case '+': {
          // If there use already clicked add, ignore it
          // FIXME: Use lodash for backward compatibility
          if (text.includes('+')) break;

          setText((prevValue) => `${prevValue} ${value} `);
          break;
        }

        // Delete last character
        case 'DEL':
          setText((prevValue) => prevValue.slice(0, -1));
          break;

        // Do a sum if there's 2 numbers with a +
        case '=': {
          // If user hasn't clicked add ignore
          // FIXME: Use lodash for backward compatibility
          if (!text.includes('+')) break;

          const [numberA = '', numberB = ''] = text.split(' + ');

          const sum = parseFloat(numberA) + parseFloat(numberB);

          if (Number.isNaN(sum)) throw new Error('Failed to add number');

          setText((prevValue) => `${prevValue} = ${sum}`);
          break;
        }

        // Concatenate
        default: {
          setText((prevValue) => `${prevValue}${value}`);
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="textView">
          <input type="text" className="textBox" value={text} />
        </div>

        <div className="numbers">
          {[7, 8, 9, 'AC', 4, 5, 6, 'DEL', 1, 2, 3, '+', 0, '.', '='].map(
            (value) => (
              <div
                key={value}
                className={classnames('number', { zero: value === 0 })}
                onClick={handleValue(value)}>
                <span>{value}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
