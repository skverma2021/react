import React, { useState } from 'react';
// import { useState } from 'react';

import DepttGradeXtab from './DepttGradeXtab';
import DepttAgeXtab from './DepttAgeXtab';

const ReportsHR = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <button onClick={handleClick}>
        {count % 2 == 0 ? 'Deptt-Grade' : 'Deptt-Age'}
      </button>
      <div>{count % 2 == 0 ? <DepttGradeXtab /> : <DepttAgeXtab />}</div>
    </div>
  );
};

export default ReportsHR;
