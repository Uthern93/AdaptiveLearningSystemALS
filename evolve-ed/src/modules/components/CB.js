// ComponentB.js
import React from 'react';

function CB(props) {
  // Access the string from props
  const strings = props.myString;
  console.log("CB: " + props.myNum);

  return (
    <div>
      {/* Use the string in ComponentB */}
      <p>{strings}""</p>
      <p>test: {props.myString}</p>
    </div>
  );
}

export default CB;
