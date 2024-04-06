// ComponentA.js
import React from 'react';
import CB from './CB';

function CA() {
  const myString = "Hello from ComponentA";

  return (
    <div>
      <CB myString={myString} myNum ={10} />
    </div>
  );
}

export default CA;
