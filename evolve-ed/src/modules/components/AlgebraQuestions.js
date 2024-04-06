import React, { useState, useEffect } from 'react';
import AlgebraSolver from './AlgebraSolver';

const AlgebraQestions = () => {
    const [problem, setProblem] = useState('');

    const generateAlgebraicProblemLevel1 = () => {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        const d = Math.floor(Math.random() * 10) + 1;
        console.log("a: ",a);
        console.log("b: ",b);
        console.log("c: ",c);
        console.log("d: ",d);

        const variables = ['w', 'k', 'y', 'z'];
        const variable = variables[Math.floor(Math.random() * variables.length)];
        const symbols = ['+', '-'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];

        const problemString = `${a}${variable} ${symbol} ${b} = ${c}${variable} ${symbol} ${d}`;
        return problemString;
    };

    const displayProblem = () => {
        const problem = generateAlgebraicProblemLevel1();
        setProblem(problem);
    };
    useEffect(() => {
        displayProblem();
    }, []);

    return (
        <div style={{border:"5px solid red"}}>
            <div id="problem">{problem}</div>
            <button onClick={displayProblem}>Generate New Problem</button>
            
            <AlgebraSolver theEquation={problem} />

        </div>
    );
};

export default AlgebraQestions;
