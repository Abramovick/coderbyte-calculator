import React, { useState, FormEvent } from 'react';
import classnames from 'classnames';

import './App.css';

function App() {
  const [text, setText] = useState('');
  const [leftSideOfOperation, setLeftSideOfOperation] = useState('');
  const [rightSideOfOperation, setRightSideOfOperation] = useState('');
  const [operation, setOperation] = useState<null | '+'>(null);

  const handleOnChange = (e: FormEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);

  const handleValue = (value: string | number) => () => {
    if (typeof value === 'number') {
      // is right hand of operation?
      if (operation) {
        return setLeftSideOfOperation(
          (prevValue) => `${prevValue}${leftSideOfOperation}`,
        );
      }

      return setLeftSideOfOperation(
        (prevValue) => `${prevValue}${leftSideOfOperation}`,
      );
    }

    switch (value) {
      case 'AC': {
        console.log('clear everything');
        break;
      }

      case '+': {
        console.log('add');
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="textView">
          <input
            type="text"
            className="textBox"
            value={text}
            onChange={handleOnChange}
          />
        </div>

        <div className="numbers">
          {[7, 8, 9, 'AC', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='].map(
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
