import React, { useState } from 'react';
import YrMn from './YrMn';
import YrDMn from './YrDMn';
import YrDMnC from './YrDMnC';

const ReportsBD = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  const showContent = (x) => {
    switch (x % 3) {
      case 0:
        return <YrMn />;
      case 1:
        return <YrDMn />;
      case 2:
        return <YrDMnC />;
    }
  };
  const showBtnLable = (x) => {
    switch (x % 3) {
      case 0:
        return 'Year-Month';
      case 1:
        return 'Year-Month-Department';
      case 2:
        return 'Year-Month-Department-Client';
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          width: '100%',
          height: '30px',
          textAlign: 'right',
          color: 'blue',
        }}
      >
        <h4>Next: {showBtnLable(count + 1)}</h4>
      </button>
      <div>{showContent(count)}</div>
    </div>
  );
};

export default ReportsBD;
